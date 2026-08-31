import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from '@/components/auth/AuthInput'
import { MailCheck } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth()
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bio-lime/10">
          <MailCheck className="h-6 w-6 text-bio-lime" strokeWidth={1.75} />
        </div>
        <p className="font-body text-sm text-bio-paper">
          Se esse e-mail existir na nossa base, enviamos um link de redefinição de senha.
        </p>
        <Link to="/login" className="font-body text-sm font-semibold text-bio-lime">
          Voltar para o login
        </Link>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!email) {
          setError('Informe um e-mail válido.')
          return
        }

        const result = await resetPassword(email)
        if (!result.ok) {
          setError(result.error)
          return
        }

        setError('')
        setSent(true)
      }}
    >
      <p className="font-body text-sm text-bio-ink-soft">
        Informe o e-mail da sua conta e enviaremos um link para redefinir sua senha.
      </p>
      <AuthInput
        label="E-mail"
        type="email"
        placeholder="voce@email.com"
        value={email}
        onChange={setEmail}
        error={error}
      />
      <button className="mt-1 rounded-bio-pill bg-bio-lime py-3.5 font-display text-sm font-bold text-bio-ink">
        Enviar link de redefinição
      </button>
      <Link to="/login" className="text-center font-body text-sm font-semibold text-bio-ink-soft">
        Cancelar
      </Link>
    </form>
  )
}
