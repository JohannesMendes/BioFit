import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '@/components/auth/AuthInput'
import { ImageUploadField } from '@/components/auth/ImageUploadField'
import { useAuth } from '@/context/AuthContext'

export function SignupForm() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Preencha nome, e-mail e senha.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    const result = signup(name, email, password, avatarUrl || undefined)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/perfil')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <AuthInput label="Nome completo" placeholder="Seu nome" value={name} onChange={setName} />
      <AuthInput label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={setEmail} />
      <AuthInput
        label="Senha"
        type="password"
        placeholder="Mínimo 8 caracteres"
        value={password}
        onChange={setPassword}
      />
      <AuthInput
        label="Confirmar senha"
        type="password"
        placeholder="Repita a senha"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={error}
      />

      <ImageUploadField
        label="Foto de perfil (opcional)"
        name={name}
        email={email}
        value={avatarUrl}
        onChange={setAvatarUrl}
      />

      <button type="submit" className="mt-1 rounded-bio-pill bg-bio-lime py-3.5 font-display text-sm font-bold text-bio-ink">
        Criar conta
      </button>

      <p className="mt-2 text-center font-body text-sm text-bio-ink-soft">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-bio-lime">
          Entrar
        </Link>
      </p>
    </form>
  )
}
