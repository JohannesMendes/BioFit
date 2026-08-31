import { useState } from 'react'
import type { Exercise } from '@/types'

export function ExplanationTabs({ exercise }: { exercise: Exercise }) {
  const [level, setLevel] = useState<'simples' | 'biomecanica'>('simples')

  return (
    <div className="px-4 py-5">
      <div className="mb-3 flex flex-nowrap gap-1.5 rounded-bio-pill border border-bio-line bg-bio-surface p-1">
        <button
          onClick={() => setLevel('simples')}
          className={`flex-1 rounded-bio-pill px-3 py-1.5 font-body text-xs font-semibold transition-colors ${
            level === 'simples' ? 'bg-bio-lime text-bio-ink' : 'text-bio-ink-soft'
          }`}
        >
          Visão Simples
        </button>
        <button
          onClick={() => setLevel('biomecanica')}
          className={`flex-1 rounded-bio-pill px-3 py-1.5 font-body text-xs font-semibold transition-colors ${
            level === 'biomecanica' ? 'bg-bio-lime text-bio-ink' : 'text-bio-ink-soft'
          }`}
        >
          Biomecânica Científica
        </button>
      </div>

      {level === 'simples' ? (
        <p className="font-body text-sm leading-relaxed text-bio-paper">
          {exercise.explanation.simples}
        </p>
      ) : (
        <dl className="flex flex-col gap-3">
          {exercise.explanation.biomecanica.articulacoes && (
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-wide text-bio-lime">
                Função articular
              </dt>
              <dd className="mt-1 font-body text-sm leading-relaxed text-bio-paper">
                {exercise.explanation.biomecanica.articulacoes}
              </dd>
            </div>
          )}
          {exercise.explanation.biomecanica.vetorForca && (
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-wide text-bio-lime">
                Vetor de força
              </dt>
              <dd className="mt-1 font-body text-sm leading-relaxed text-bio-paper">
                {exercise.explanation.biomecanica.vetorForca}
              </dd>
            </div>
          )}
          {exercise.explanation.biomecanica.amplitude && (
            <div>
              <dt className="font-display text-[11px] font-semibold uppercase tracking-wide text-bio-lime">
                Amplitude / alongamento
              </dt>
              <dd className="mt-1 font-body text-sm leading-relaxed text-bio-paper">
                {exercise.explanation.biomecanica.amplitude}
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  )
}
