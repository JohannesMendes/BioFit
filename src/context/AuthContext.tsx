import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, updateProfile } from 'firebase/auth'
import {
  auth,
  isFirebaseConfigured,
  loginWithEmail as firebaseLoginWithEmail,
  signUpWithEmail as firebaseSignUpWithEmail,
} from '@/services/firebase'
import type { AuthUser } from '@/types/auth'

/**
 * AuthContext — autenticação REAL via Firebase Auth quando configurada,
 * com um mock em localStorage como fallback (só pra continuar dando
 * pra testar o app sem precisar configurar um projeto Firebase antes).
 * -----------------------------------------------------------------
 * COMO SABER QUAL MODO ESTÁ ATIVO: `isFirebaseConfigured` (de
 * src/services/firebase.ts) é true assim que as variáveis
 * VITE_FIREBASE_* estiverem no `.env` (ver instruções em firebase.ts).
 * Com isso ativo, e-mail/senha vai de verdade pro Firebase — nenhuma
 * senha passa pelo nosso código ou fica salva no navegador.
 *
 * SEM Firebase configurado, cai no mock antigo: cadastro e login
 * simulados em localStorage, só pra prototipar a tela. Isso NUNCA foi
 * seguro (senha em texto puro no navegador) — é só um substituto
 * temporário até você configurar o Firebase de verdade.
 */

interface StoredAccount extends AuthUser {
  password: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>
  signup: (
    name: string,
    email: string,
    password: string,
    avatarUrl?: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  loginWithGoogle: () => void
  loginWithGoogleProfile: (profile: { name: string; email: string; picture?: string }) => void
  logout: () => void
  updateAvatar: (avatarUrl: string) => void
}

const USERS_KEY = 'biofit_users'
const SESSION_KEY = 'biofit_session_email'

function readUsers(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredAccount[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/** Mensagens PT-BR pros códigos de erro mais comuns do Firebase Auth. */
function friendlyFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.'
    case 'auth/email-already-in-use':
      return 'Já existe uma conta com esse e-mail.'
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.'
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente de novo.'
    default:
      return 'Não foi possível concluir. Tente novamente.'
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        setUser(
          fbUser
            ? { name: fbUser.displayName ?? '', email: fbUser.email ?? '', avatarUrl: fbUser.photoURL ?? undefined }
            : null,
        )
      })
      return unsubscribe
    }
    const email = localStorage.getItem(SESSION_KEY)
    if (!email) return
    const account = readUsers().find((u) => u.email === email)
    if (account) setUser({ name: account.name, email: account.email, avatarUrl: account.avatarUrl })
  }, [])

  async function login(email: string, password: string) {
    if (isFirebaseConfigured) {
      try {
        await firebaseLoginWithEmail(email, password)
        return { ok: true as const }
      } catch (err) {
        const code = (err as { code?: string })?.code ?? ''
        return { ok: false as const, error: friendlyFirebaseError(code) }
      }
    }
    const account = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!account || account.password !== password) {
      return { ok: false as const, error: 'E-mail ou senha incorretos.' }
    }
    localStorage.setItem(SESSION_KEY, account.email)
    setUser({ name: account.name, email: account.email, avatarUrl: account.avatarUrl })
    return { ok: true as const }
  }

  async function signup(name: string, email: string, password: string, avatarUrl?: string) {
    if (isFirebaseConfigured) {
      try {
        await firebaseSignUpWithEmail(name, email, password)
        if (avatarUrl && auth.currentUser) {
          await updateProfile(auth.currentUser, { photoURL: avatarUrl }).catch(() => {})
          setUser((u) => (u ? { ...u, avatarUrl } : u))
        }
        return { ok: true as const }
      } catch (err) {
        const code = (err as { code?: string })?.code ?? ''
        return { ok: false as const, error: friendlyFirebaseError(code) }
      }
    }
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false as const, error: 'Já existe uma conta com esse e-mail.' }
    }
    const account: StoredAccount = { name, email, password, avatarUrl }
    writeUsers([...users, account])
    localStorage.setItem(SESSION_KEY, email)
    setUser({ name, email, avatarUrl })
    return { ok: true as const }
  }

  function loginWithGoogle() {
    // Simulação (só usada quando NEM o Firebase, NEM o Google Identity
    // Services de src/lib/googleAuth.ts estão configurados): gera um
    // usuário de exemplo pra demonstrar a experiência esperada.
    const demo: StoredAccount = {
      name: 'Convidado Google',
      email: 'convidado.google@biofit.app',
      password: '',
      avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=biofit-google',
    }
    const users = readUsers()
    if (!users.some((u) => u.email === demo.email)) writeUsers([...users, demo])
    localStorage.setItem(SESSION_KEY, demo.email)
    setUser({ name: demo.name, email: demo.email, avatarUrl: demo.avatarUrl })
  }

  function loginWithGoogleProfile(profile: { name: string; email: string; picture?: string }) {
    // Usado quando o Google Identity Services está configurado de verdade
    // (ver src/lib/googleAuth.ts) — nome, e-mail e foto vêm da conta
    // Google real que a pessoa escolheu no seletor de contas.
    const users = readUsers()
    const existing = users.find((u) => u.email === profile.email)
    if (existing) {
      writeUsers(
        users.map((u) => (u.email === profile.email ? { ...u, name: profile.name, avatarUrl: profile.picture } : u)),
      )
    } else {
      writeUsers([...users, { name: profile.name, email: profile.email, password: '', avatarUrl: profile.picture }])
    }
    localStorage.setItem(SESSION_KEY, profile.email)
    setUser({ name: profile.name, email: profile.email, avatarUrl: profile.picture })
  }

  function logout() {
    if (isFirebaseConfigured) {
      firebaseSignOut(auth).catch(() => {})
      return
    }
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  function updateAvatar(avatarUrl: string) {
    if (!user) return
    if (isFirebaseConfigured && auth.currentUser) {
      updateProfile(auth.currentUser, { photoURL: avatarUrl }).catch(() => {})
      setUser({ ...user, avatarUrl })
      return
    }
    const users = readUsers().map((u) => (u.email === user.email ? { ...u, avatarUrl } : u))
    writeUsers(users)
    setUser({ ...user, avatarUrl })
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, loginWithGoogleProfile, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
