import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from '@/components/auth/AuthInput'
import { MailCheck } from 'lucide-react'
import { isFirebaseConfigured, sendResetPasswordEmail } from '@/services/firebase'

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setError('Informe seu e-mail.')
      return
    }
    if (!isFirebaseConfigured) {
      // Sem Firebase configurado não há e-mail de verdade pra enviar — só
      // simula a experiência, igual ao resto do fluxo de auth em modo demo.
      setSent(true)
      return
    }
    setSubmitting(true)
    try {
      await sendResetPasswordEmail(email)
      setSent(true)
    } catch {
      // Por segurança, o Firebase (e nós) não revelamos se o e-mail existe
      // ou não — mostramos a mesma confirmação de sucesso mesmo assim.
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
      <p className="font-body text-sm text-bio-ink-soft">
        Informe o e-mail da sua conta e enviaremos um link para redefinir sua senha.
      </p>
      <AuthInput label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={setEmail} error={error} />
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-bio-pill bg-bio-lime py-3.5 font-display text-sm font-bold text-bio-ink disabled:opacity-60"
      >
        {submitting ? 'Enviando…' : 'Enviar link de redefinição'}
      </button>
      <Link to="/login" className="text-center font-body text-sm font-semibold text-bio-ink-soft">
        Cancelar
      </Link>
    </form>
  )
}
