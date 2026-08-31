import { Search } from 'lucide-react'

export function LocalSearch({
  value,
  onChange,
  placeholder = 'Buscar nesta categoria',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-bio-pill border border-bio-line bg-bio-surface px-3.5 py-2.5">
      <Search className="h-4 w-4 shrink-0 text-bio-ink-soft" strokeWidth={2} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-body text-sm text-bio-paper placeholder:text-bio-ink-soft/70 focus:outline-none"
      />
    </div>
  )
}
