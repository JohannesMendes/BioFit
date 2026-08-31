import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { Avatar } from '@/components/layout/Avatar'

export function TopBar() {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-bio-ink/95 px-5 pb-3 pt-6 backdrop-blur">
      <span className="font-display text-lg font-bold tracking-tight text-bio-paper">
        Bio<span className="text-bio-lime">Fit</span>
      </span>
      <Link to="/perfil" aria-label="Perfil">
        <Avatar user={user} size={36} />
      </Link>
    </header>
  )
}
