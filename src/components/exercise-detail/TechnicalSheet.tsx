import { AlertTriangle, Repeat, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary'
import type { Exercise } from '@/types'

export function TechnicalSheet({ exercise }: { exercise: Exercise }) {
  const { exercises } = useExerciseLibrary()
  const substitutes = exercise.fichaTecnica.substitutos
    .map((id) => exercises.find((e) => e.id === id))
    .filter((e): e is Exercise => Boolean(e))

  return (
    <div className="flex flex-col gap-6 border-t border-bio-line px-4 py-5">
      <section>
        <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-bio-paper">
          <Wrench className="h-4 w-4 text-bio-lime" strokeWidth={1.75} />
          Equipamentos necessários
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {exercise.fichaTecnica.equipamentosNecessarios.map((eq) => (
            <span
              key={eq}
              className="rounded-bio-pill border border-bio-line px-2.5 py-1 font-body text-xs text-bio-ink-soft"
            >
              {eq}
            </span>
          ))}
        </div>
      </section>

      {exercise.fichaTecnica.errosComuns.length > 0 && (
        <section>
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-bio-paper">
            <AlertTriangle className="h-4 w-4 text-bio-danger" strokeWidth={1.75} />
            Erros comuns a evitar
          </h3>
          <ul className="flex flex-col gap-2">
            {exercise.fichaTecnica.errosComuns.map((erro) => (
              <li key={erro} className="flex gap-2 font-body text-sm text-bio-paper">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bio-danger" />
                {erro}
              </li>
            ))}
          </ul>
        </section>
      )}

      {substitutes.length > 0 && (
        <section>
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-bio-paper">
            <Repeat className="h-4 w-4 text-bio-lime" strokeWidth={1.75} />
            Se o aparelho estiver ocupado
          </h3>
          <div className="flex flex-col gap-2">
            {substitutes.map((s) => (
              <Link
                key={s.id}
                to={`/exercicios/${s.id}`}
                className="rounded-bio-md border border-bio-line bg-bio-surface px-3 py-2.5 font-body text-sm text-bio-paper"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
