import { Home, Dumbbell, ClipboardList, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/exercicios', label: 'Exercícios', icon: Dumbbell },
  { to: '/treinos', label: 'Meus Treinos', icon: ClipboardList },
  { to: '/perfil', label: 'Perfil', icon: User },
]

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-bio-line bg-bio-ink/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-bio-md px-4 py-1.5 transition-colors ${
              isActive ? 'text-bio-lime' : 'text-bio-ink-soft'
            }`
          }
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
          <span className="font-body text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
