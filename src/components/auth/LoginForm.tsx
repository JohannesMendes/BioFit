import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '@/components/auth/AuthInput'
import { useAuth } from '@/context/AuthContext'
import { isGoogleAuthConfigured, renderGoogleButton } from '@/lib/googleAuth'

export function LoginForm() {
  const { login, loginWithGoogle, loginWithGoogleProfile } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const googleButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEmail('')
    setPassword('')
    setError('')
  }, [])

  useEffect(() => {
    if (!googleButtonRef.current) return
    renderGoogleButton(googleButtonRef.current, (profile) => {
      loginWithGoogleProfile(profile)
      navigate('/perfil')
    })
    // renderGoogleButton só tem efeito se VITE_GOOGLE_CLIENT_ID estiver configurado;
    // caso contrário o botão de fallback abaixo assume o lugar.
  }, [loginWithGoogleProfile, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Preencha e-mail e senha.')
      return
    }

    const result = await login(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate('/perfil')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
      <AuthInput
        label="E-mail"
        type="email"
        placeholder="voce@email.com"
        value={email}
        onChange={setEmail}
        autoComplete="new-email"
      />
      <AuthInput
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        error={error}
        autoComplete="new-password"
      />

      <div className="flex justify-end">
        <Link to="/esqueci-senha" className="font-body text-xs font-medium text-bio-lime">
          Esqueci minha senha
        </Link>
      </div>

      <button type="submit" className="mt-1 rounded-bio-pill bg-bio-lime py-3.5 font-display text-sm font-bold text-bio-ink">
        Entrar
      </button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-bio-line" />
        <span className="font-body text-[11px] text-bio-ink-soft">ou continue com</span>
        <div className="h-px flex-1 bg-bio-line" />
      </div>

      {/* Botão oficial do Google renderiza aqui quando VITE_GOOGLE_CLIENT_ID
          está configurado. Sem isso, mostramos um botão de demonstração. */}
      <div ref={googleButtonRef} className="flex justify-center [&>div]:!w-full" />
      {!isGoogleAuthConfigured && (
        <button
          type="button"
          onClick={async () => {
            const result = await loginWithGoogle()
            if (!result.ok) {
              setError(result.error)
              return
            }
            navigate('/perfil')
          }}
          className="flex items-center justify-center gap-2 rounded-bio-pill border border-bio-line bg-bio-surface py-3.5 font-body text-sm font-semibold text-bio-paper"
        >
          <GoogleIcon />
          Entrar com Google
        </button>
      )}

      <p className="mt-2 text-center font-body text-sm text-bio-ink-soft">
        Não tem conta?{' '}
        <Link to="/cadastro" className="font-semibold text-bio-lime">
          Criar conta
        </Link>
      </p>
    </form>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.5 18.9 12 24 12c3.1 0 5.8 1.1 8 3l6-6C34.5 6 29.5 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.4 0 10.3-1.8 14-5l-6.5-5.4C29.4 35.5 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5C9.8 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.5 5.4C41.5 35.8 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  )
}
