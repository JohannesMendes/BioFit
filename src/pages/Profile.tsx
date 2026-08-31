import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { BottomNav } from '@/components/layout/BottomNav'
import { Avatar } from '@/components/layout/Avatar'
import { ImageUploadField } from '@/components/auth/ImageUploadField'
import { useAuth } from '@/context/AuthContext'

export function Profile() {
  const { user, logout, updateAvatar } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex min-h-full flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <Avatar user={null} size={56} />
          <p className="font-display text-sm font-semibold text-bio-paper">
            Você ainda não entrou na sua conta
          </p>
          <button
            onClick={() => navigate('/login')}
            className="rounded-bio-pill bg-bio-lime px-6 py-3 font-display text-sm font-bold text-bio-ink"
          >
            Entrar
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 px-6 pt-10">
        <div className="flex flex-col items-center gap-3">
          <Avatar user={user} size={72} />
          <div className="text-center">
            <p className="font-display text-base font-bold text-bio-paper">{user.name}</p>
            <p className="font-body text-xs text-bio-ink-soft">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <ImageUploadField
            label="Trocar foto de perfil"
            name={user.name}
            email={user.email}
            value={user.avatarUrl ?? ''}
            onChange={updateAvatar}
          />
        </div>

        <button
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-bio-pill border border-bio-line py-3 font-body text-sm font-semibold text-bio-danger"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sair da conta
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
