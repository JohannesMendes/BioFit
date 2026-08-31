import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { BookOpen } from 'lucide-react'

/**
 * Placeholder para uma futura biblioteca educativa (anatomia, biomecânica
 * básica, glossário de termos). Fora do escopo dos 3 blocos solicitados,
 * mas a aba já existe na navegação — mantida como stub intencional.
 */
export function Learn() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <BookOpen className="h-8 w-8 text-bio-lime" strokeWidth={1.5} />
        <p className="font-display text-sm font-semibold text-bio-paper">
          Biblioteca de Anatomia
        </p>
        <p className="font-body text-sm text-bio-ink-soft">
          Conteúdo educativo sobre biomecânica e fisiologia chega em breve.
        </p>
      </main>
      <BottomNav />
    </div>
  )
}
