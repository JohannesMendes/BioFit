import type { Environment } from '@/types'

const options: { id: Environment | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'academia', label: 'Academia' },
  { id: 'casa', label: 'Em Casa' },
]

export function EnvironmentToggle({
  value,
  onChange,
}: {
  value: Environment | 'todos'
  onChange: (v: Environment | 'todos') => void
}) {
  return (
    <div className="flex gap-1.5 rounded-bio-pill border border-bio-line bg-bio-surface p-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex-1 rounded-bio-pill px-3 py-1.5 font-body text-xs font-semibold transition-colors ${
            value === opt.id
              ? 'bg-bio-lime text-bio-ink'
              : 'text-bio-ink-soft'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
