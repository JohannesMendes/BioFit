import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Avatar } from '@/components/layout/Avatar'
import { useHomeStats } from '@/hooks/useHomeStats'

export function HomeHeader() {
  const { user } = useAuth()
  const stats = useHomeStats()

  return (
    <header className="px-5 pb-5 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-bio-ink-soft">
            Bem-vindo de volta
          </p>
          <h1 className="font-display text-2xl font-bold leading-tight text-bio-paper">
            {user ? user.name : 'Sua jornada começa aqui'}
          </h1>
        </div>
        <Link to="/perfil" aria-label="Perfil" className="shrink-0">
          <Avatar user={user} size={48} />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-bio-md border border-bio-line bg-bio-surface px-3 py-3 text-center">
          <p className="font-display text-xl font-bold text-bio-lime">{stats.treinos}</p>
          <p className="mt-0.5 font-body text-[11px] text-bio-ink-soft">Treinos</p>
        </div>
        <div className="rounded-bio-md border border-bio-line bg-bio-surface px-3 py-3 text-center">
          <p className="font-display text-xl font-bold text-bio-lime">
            {stats.metasSemana.atual}
            <span className="text-sm text-bio-ink-soft">/{stats.metasSemana.meta}</span>
          </p>
          <p className="mt-0.5 font-body text-[11px] text-bio-ink-soft">Metas semana</p>
        </div>
        <div className="rounded-bio-md border border-bio-line bg-bio-surface px-3 py-3 text-center">
          <p className="flex items-center justify-center gap-1 font-display text-xl font-bold text-bio-lime">
            <Flame className="h-4 w-4" strokeWidth={2} />
            {stats.sequenciaDias}d
          </p>
          <p className="mt-0.5 font-body text-[11px] text-bio-ink-soft">Sequência</p>
        </div>
      </div>

      {!stats.isLoggedIn && (
        <Link
          to="/login"
          className="mt-3 block rounded-bio-md border border-dashed border-bio-line px-3 py-2 text-center font-body text-xs font-medium text-bio-ink-soft"
        >
          <span className="font-semibold text-bio-lime">Faça login</span> para essas estatísticas
          contarem seus treinos de verdade
        </Link>
      )}
    </header>
  )
}
