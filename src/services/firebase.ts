import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from 'firebase/auth'

/**
 * firebase.ts — configuração e autenticação REAIS via Firebase Auth.
 * -----------------------------------------------------------------------
 * Substitui a integração anterior baseada em Google Identity Services
 * (GIS) + decodificação manual de JWT. Agora o Firebase cuida de todo o
 * fluxo OAuth: popup de contas, troca de token e sessão.
 *
 * COMO ATIVAR:
 * 1. Crie um projeto em https://console.firebase.google.com/
 * 2. Vá em Build → Authentication → Sign-in method → ative o provedor
 *    "Google".
 * 3. Em Configurações do projeto → Geral → "Seus apps", crie um app Web
 *    e copie o objeto de configuração (apiKey, authDomain, etc.).
 * 4. Crie um arquivo `.env` na raiz (copie de `.env.example`) e cole os
 *    valores nas variáveis VITE_FIREBASE_*.
 * 5. Em Authentication → Settings → Authorized domains, adicione o
 *    domínio onde o app roda (localhost já vem liberado por padrão).
 * 6. Reinicie `npm run dev`.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

/**
 * Abre o popup de contas do Google e retorna o usuário autenticado de
 * verdade — nome, foto e e-mail vêm direto da conta Google escolhida.
 * Lança o erro do Firebase adiante para a camada de UI tratar
 * (ex.: popup fechado pelo usuário, popup bloqueado, etc.).
 */
export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error('Erro no login com Google:', error)
    throw error
  }
}

/**
 * E-mail/senha via Firebase Auth de verdade — só existe (é usado pelo
 * AuthContext) quando `isFirebaseConfigured` é true. A senha nunca passa
 * pelo nosso código em texto puro: vai direto pro SDK do Firebase, que
 * lida com hashing e sessão do jeito certo. Isso substitui o mock de
 * localStorage (que guardava senha em texto puro — nunca foi seguro,
 * só uma simulação pra prototipar a tela).
 */
export const signUpWithEmail = async (name: string, email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  if (name) await updateProfile(result.user, { displayName: name })
  return result.user
}

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const sendResetPasswordEmail = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
}
