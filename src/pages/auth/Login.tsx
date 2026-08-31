import { AuthShell } from '@/pages/auth/AuthShell'
import { LoginForm } from '@/components/auth/LoginForm'

export function Login() {
  return (
    <AuthShell title="Entrar" subtitle="Continue sua evolução de onde parou.">
      <LoginForm />
    </AuthShell>
  )
}
