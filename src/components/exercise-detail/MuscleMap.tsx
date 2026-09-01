import { useMemo, useState } from 'react'
import Model from 'react-body-highlighter'
import type { IExerciseData } from 'react-body-highlighter'
import { PATH_ID_TO_BODY_MUSCLE, type BodyView } from '@/lib/bodyMuscleMap'
import type { MuscleHighlight } from '@/types'

/**
 * MuscleMap
 * ---------
 * Corpo anatômico real (frente/costas), via react-body-highlighter —
 * biblioteca open-source (MIT), no lugar do desenho em blocos que
 * tínhamos antes. Continua usando os mesmos pathId de sempre
 * (ver src/lib/bodyMuscleMap.ts para o de-para).
 *
 * Cor = significado: verde-lima (--color-bio-lime) é usado SOMENTE para
 * o músculo alvo. Sinergistas usam um verde apagado. O resto do corpo
 * fica neutro.
 */
export function MuscleMap({ highlights }: { highlights: MuscleHighlight[] }) {
  const { anteriorData, posteriorData, hasAnterior, hasPosterior } = useMemo(() => {
    const anterior: IExerciseData[] = []
    const posterior: IExerciseData[] = []

    for (const h of highlights) {
      const mapped = PATH_ID_TO_BODY_MUSCLE[h.pathId]
      if (!mapped) continue
      const frequency = h.role === 'alvo' ? 2 : 1
      const entry: IExerciseData = { name: h.pathId, muscles: [mapped.slug], frequency }
      if (mapped.view === 'anterior') anterior.push(entry)
      else posterior.push(entry)
    }

    return {
      anteriorData: anterior,
      posteriorData: posterior,
      hasAnterior: anterior.length > 0,
      hasPosterior: posterior.length > 0,
    }
  }, [highlights])

  const [view, setView] = useState<BodyView>(hasAnterior ? 'anterior' : 'posterior')
  const data = view === 'anterior' ? anteriorData : posteriorData

  const bioLime = getCssVar('--color-bio-lime', '#C6FF3A')
  const bioSynergist = getCssVar('--color-bio-synergist', '#5FBFAE')
  const bioBody = getCssVar('--color-bio-muscle-body', '#3A3F38')

  return (
    <div className="flex flex-col items-center gap-3">
      {hasAnterior && hasPosterior && (
        <div className="flex gap-1.5 rounded-bio-pill border border-bio-line bg-bio-surface p-1">
          {(['anterior', 'posterior'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-bio-pill px-4 py-1 font-body text-xs font-semibold transition-colors ${
                view === v ? 'bg-bio-lime text-bio-ink' : 'text-bio-ink-soft'
              }`}
            >
              {v === 'anterior' ? 'Frente' : 'Costas'}
            </button>
          ))}
        </div>
      )}

      <Model
        type={view}
        data={data}
        bodyColor={bioBody}
        highlightedColors={[bioSynergist, bioLime]}
        style={{ width: '13rem', padding: 0 }}
        svgStyle={{ filter: 'drop-shadow(0 0 24px rgba(198,255,58,0.10))' }}
      />

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-4 font-body text-[11px] text-bio-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-bio-lime" /> Alvo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bioSynergist }} />
            Sinergista
          </span>
        </div>
        <p className="max-w-[220px] text-center font-body text-[10px] leading-snug text-bio-ink-soft/70">
          Sinergista = músculo que ajuda no movimento, mas não é o foco principal do exercício.
        </p>
      </div>
    </div>
  )
}

function getCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}
