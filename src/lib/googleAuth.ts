import { jwtDecode } from 'jwt-decode'

/**
 * googleAuth.ts — integração REAL com o Google Identity Services (GIS).
 * -----------------------------------------------------------------------
 * Diferente do `loginWithGoogle` mock no AuthContext, isto usa a
 * biblioteca oficial do Google (carregada no index.html) e, quando um
 * Client ID válido é configurado, mostra o seletor de contas Google de
 * verdade — a mesma tela que você vê em qualquer "Entrar com Google".
 *
 * COMO ATIVAR (veja também o README):
 * 1. Crie um projeto em https://console.cloud.google.com/
 * 2. APIs & Services → Credentials → Create Credentials → OAuth Client ID
 *    → tipo "Web application"
 * 3. Em "Authorized JavaScript origins", adicione a URL onde o app roda
 *    (ex.: http://localhost:5173 e o domínio da Vercel/Netlify)
 * 4. Copie o Client ID gerado para o arquivo `.env` como
 *    VITE_GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
 * 5. Reinicie `npm run dev`
 *
 * Sem essa variável configurada, o app cai automaticamente no modo demo
 * (ver AuthContext.loginWithGoogle) para que a tela continue funcional
 * durante o desenvolvimento.
 */

interface GoogleCredentialPayload {
  name: string
  email: string
  picture?: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          prompt: () => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const isGoogleAuthConfigured = Boolean(GOOGLE_CLIENT_ID)

export function decodeGoogleCredential(credential: string): GoogleCredentialPayload {
  return jwtDecode<GoogleCredentialPayload>(credential)
}

/**
 * Renderiza o botão oficial do Google dentro do elemento informado.
 * Retorna `false` se o Client ID não estiver configurado (fallback).
 */
export function renderGoogleButton(
  container: HTMLElement,
  onCredential: (payload: GoogleCredentialPayload) => void,
): boolean {
  if (!isGoogleAuthConfigured || !window.google) return false

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID!,
    callback: (response) => {
      const payload = decodeGoogleCredential(response.credential)
      onCredential(payload)
    },
  })

  window.google.accounts.id.renderButton(container, {
    theme: 'filled_black',
    size: 'large',
    shape: 'pill',
    width: 320,
    text: 'continue_with',
    logo_alignment: 'center',
  })

  return true
}
