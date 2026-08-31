import { AuthShell } from '@/pages/auth/AuthShell'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export function ForgotPassword() {
  return (
    <AuthShell title="Redefinir senha">
      <ForgotPasswordForm />
    </AuthShell>
  )
}
