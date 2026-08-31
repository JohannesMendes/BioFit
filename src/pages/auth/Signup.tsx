import { AuthShell } from '@/pages/auth/AuthShell'
import { SignupForm } from '@/components/auth/SignupForm'

export function Signup() {
  return (
    <AuthShell title="Criar conta" subtitle="Do leigo ao científico — no seu ritmo.">
      <SignupForm />
    </AuthShell>
  )
}
