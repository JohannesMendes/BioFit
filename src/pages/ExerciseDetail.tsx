import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { MediaTabs } from '@/components/exercise-detail/MediaTabs'
import { ExplanationTabs } from '@/components/exercise-detail/ExplanationTabs'
import { TechnicalSheet } from '@/components/exercise-detail/TechnicalSheet'
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary'

const difficultyLabel: Record<string, string> = {
  iniciante: 'Iniciante',
  intermediário: 'Intermediário',
  avançado: 'Avançado',
}

export function ExerciseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { exercises, loading } = useExerciseLibrary()
  const exercise = exercises.find((e) => e.id === id)

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6">
        <p className="font-body text-sm text-bio-ink-soft">Carregando exercício…</p>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-body text-sm text-bio-ink-soft">Exercício não encontrado.</p>
        <button onClick={() => navigate('/exercicios')} className="font-body text-sm font-semibold text-bio-lime">
          Voltar para a lista
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col pb-8">
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-bio-ink/95 px-5 py-4 backdrop-blur">
        <button onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft className="h-5 w-5 text-bio-paper" />
        </button>
        <h1 className="truncate font-display text-base font-bold text-bio-paper">
          {exercise.name}
        </h1>
      </header>

      <MediaTabs exercise={exercise} />

      <div className="flex items-center gap-2 px-5 pt-4">
        <span className="rounded-bio-pill border border-bio-line px-2.5 py-1 font-body text-[11px] text-bio-ink-soft">
          {exercise.equipment}
        </span>
        <span className="rounded-bio-pill border border-bio-line px-2.5 py-1 font-body text-[11px] text-bio-ink-soft">
          {difficultyLabel[exercise.difficulty]}
        </span>
      </div>

      <ExplanationTabs exercise={exercise} />
      <TechnicalSheet exercise={exercise} />
    </div>
  )
}
