import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, updateProfile, type User as FirebaseUser } from 'firebase/auth'
import {
  auth,
  cadastrarComEmail,
  deslogar,
  loginComEmail,
  loginComGoogle,
  redefinirSenha,
} from '@/services/firebase'
import type { AuthUser } from '@/types/auth'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>
  signup: (
    name: string,
    email: string,
    password: string,
    avatarUrl?: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  loginWithGoogle: () => Promise<{ ok: true } | { ok: false; error: string }>
  loginWithGoogleProfile: (profile: { name: string; email: string; picture?: string }) => void
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ ok: true } | { ok: false; error: string }>
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function mapFirebaseUser(firebaseUser: FirebaseUser | null): AuthUser | null {
  if (!firebaseUser) return null

  return {
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
    email: firebaseUser.email || '',
    avatarUrl: firebaseUser.photoURL || undefined,
  }
}

function getFirebaseErrorMessage(code?: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/user-disabled':
      return 'Essa conta foi desativada.'
    case 'auth/user-not-found':
      return 'Nenhuma conta encontrada com esse e-mail.'
    case 'auth/wrong-password':
      return 'E-mail ou senha incorretos.'
    case 'auth/email-already-in-use':
      return 'Já existe uma conta com esse e-mail.'
    case 'auth/weak-password':
      return 'A senha deve ter no mínimo 6 caracteres.'
    case 'auth/popup-closed-by-user':
      return 'A janela de login foi fechada antes da conclusão.'
    case 'auth/cancelled-popup-request':
      return 'A autenticação foi cancelada.'
    case 'auth/network-request-failed':
      return 'Falha de conexão. Verifique sua internet.'
    default:
      return 'Não foi possível concluir a autenticação. Tente novamente.'
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser))
    })

    return () => unsubscribe()
  }, [])

  async function login(email: string, password: string) {
    try {
      await loginComEmail(email, password)
      return { ok: true as const }
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code
      return { ok: false as const, error: getFirebaseErrorMessage(code) }
    }
  }

  async function signup(name: string, email: string, password: string, avatarUrl?: string) {
    try {
      const result = await cadastrarComEmail(email, password)
      if (result.user) {
        await updateProfile(result.user, {
          displayName: name,
          photoURL: avatarUrl || undefined,
        })
      }
      return { ok: true as const }
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code
      return { ok: false as const, error: getFirebaseErrorMessage(code) }
    }
  }

  async function loginWithGoogle() {
    try {
      await loginComGoogle()
      return { ok: true as const }
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code
      return { ok: false as const, error: getFirebaseErrorMessage(code) }
    }
  }

  function loginWithGoogleProfile(profile: { name: string; email: string; picture?: string }) {
    setUser({
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.picture,
    })
  }

  async function logout() {
    await deslogar()
    setUser(null)
  }

  async function resetPassword(email: string) {
    try {
      await redefinirSenha(email)
      return { ok: true as const }
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code
      return { ok: false as const, error: getFirebaseErrorMessage(code) }
    }
  }

  function updateAvatar(avatarUrl: string) {
    if (!user) return
    setUser({ ...user, avatarUrl })
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, loginWithGoogleProfile, logout, resetPassword, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
