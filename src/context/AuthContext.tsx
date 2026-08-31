import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthUser } from '@/types/auth'

/**
 * AuthContext — autenticação MOCK baseada em localStorage.
 * -----------------------------------------------------------------
 * Isto resolve o problema de "o login não salva nada": agora cadastro e
 * login persistem entre reloads, e o avatar aparece na TopBar/Perfil.
 *
 * IMPORTANTE — isto NÃO é autenticação real:
 * - Senhas ficam em texto puro no localStorage do navegador.
 * - "Entrar com Google" aqui é simulado (gera um usuário de exemplo com
 *   avatar), pois OAuth de verdade exige um Client ID do Google Cloud +
 *   backend para trocar o token com segurança.
 * Antes de ir para produção, troque este arquivo por um provedor real:
 * Firebase Auth, Supabase Auth, ou seu próprio backend. A interface
 * exposta (useAuth) foi pensada para ser um drop-in replacement — as
 * telas de Login/Cadastro/Perfil não precisam mudar, só o "motor" aqui.
 */

interface StoredAccount extends AuthUser {
  password: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string }
  signup: (
    name: string,
    email: string,
    password: string,
    avatarUrl?: string,
  ) => { ok: true } | { ok: false; error: string }
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

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY)
    if (!email) return
    const account = readUsers().find((u) => u.email === email)
    if (account) setUser({ name: account.name, email: account.email, avatarUrl: account.avatarUrl })
  }, [])

  function login(email: string, password: string) {
    const account = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!account || account.password !== password) {
      return { ok: false as const, error: 'E-mail ou senha incorretos.' }
    }
    localStorage.setItem(SESSION_KEY, account.email)
    setUser({ name: account.name, email: account.email, avatarUrl: account.avatarUrl })
    return { ok: true as const }
  }

  function signup(name: string, email: string, password: string, avatarUrl?: string) {
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
    // Simulação: sem backend não há como trocar o token OAuth real do
    // Google por dados de perfil. Isto demonstra a experiência esperada
    // (nome + foto vindos da conta) com dados de exemplo.
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
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  function updateAvatar(avatarUrl: string) {
    if (!user) return
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
