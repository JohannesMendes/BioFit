import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AuthShell({
  title,
  subtitle,
  children,
  showBack = true,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  showBack?: boolean
}) {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-full flex-col px-6 pb-10 pt-8">
      {showBack && (
        <button onClick={() => navigate(-1)} aria-label="Voltar" className="mb-6 self-start">
          <ChevronLeft className="h-5 w-5 text-bio-paper" />
        </button>
      )}
      <div className="mb-8 flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold tracking-tight text-bio-paper">
          Bio<span className="text-bio-lime">Fit</span>
        </span>
      </div>
      <h1 className="mb-1 font-display text-xl font-bold text-bio-paper">{title}</h1>
      {subtitle && <p className="mb-6 font-body text-sm text-bio-ink-soft">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      {children}
    </div>
  )
}
