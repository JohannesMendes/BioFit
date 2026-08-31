import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '@/components/layout/BottomNav'
import { EnvironmentToggle } from '@/components/exercises/EnvironmentToggle'
import { LocalSearch } from '@/components/exercises/LocalSearch'
import { ExerciseCard } from '@/components/exercises/ExerciseCard'
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary'
import { muscleGroups } from '@/data/categories'
import type { Environment } from '@/types'

export function ExerciseList() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const grupoId = params.get('grupo')
  const grupo = muscleGroups.find((g) => g.id === grupoId)

  const { exercises, loading, source, error } = useExerciseLibrary()
  const [env, setEnv] = useState<Environment | 'todos'>('todos')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      if (grupoId && !ex.muscleGroups.includes(grupoId as never)) return false
      if (env !== 'todos' && !ex.environment.includes(env)) return false
      if (query && !ex.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [exercises, grupoId, env, query])

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 flex flex-col gap-3 bg-bio-ink/95 px-5 pb-3 pt-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} aria-label="Voltar">
            <ChevronLeft className="h-5 w-5 text-bio-paper" />
          </button>
          <h1 className="font-display text-base font-bold text-bio-paper">
            {grupo ? grupo.name : 'Todos os exercícios'}
          </h1>
        </div>
        <EnvironmentToggle value={env} onChange={setEnv} />
        <LocalSearch value={query} onChange={setQuery} placeholder={`Buscar em ${grupo ? grupo.name.toLowerCase() : 'exercícios'}`} />
        {source === 'local-fallback' && error && (
          <div className="flex items-center gap-2 rounded-bio-md border border-bio-line bg-bio-surface px-3 py-2 font-body text-[11px] text-bio-ink-soft">
            <WifiOff className="h-3.5 w-3.5 shrink-0 text-bio-lime" strokeWidth={1.75} />
            Usando a biblioteca local do BioFit — ExerciseDB indisponível no momento.
          </div>
        )}
      </header>

      <main className="flex-1 px-5 py-4">
        {loading ? (
          <p className="mt-10 text-center font-body text-sm text-bio-ink-soft">Carregando exercícios…</p>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-center font-body text-sm text-bio-ink-soft">
            Nenhum exercício encontrado com esses filtros.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
