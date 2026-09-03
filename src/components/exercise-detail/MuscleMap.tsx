import { useMemo, useState } from 'react'
import Model from 'react-body-highlighter'
import type { IExerciseData } from 'react-body-highlighter'
import { PATH_ID_TO_BODY_MUSCLE, type BodyView } from '@/lib/bodyMuscleMap'
import { muscleDisplayName } from '@/lib/muscleDisplayNames'
import type { MuscleHighlight } from '@/types'

/**
 * MuscleMap
 * ---------
 * Corpo anatômico real (frente/costas), via react-body-highlighter —
 * biblioteca open-source (MIT). Além de colorir a região no boneco,
 * lista por extenso o NOME de cada músculo alvo/auxiliar embaixo —
 * pedido explícito: só a cor no desenho não deixava claro qual músculo
 * era qual.
 *
 * Cor = significado: verde-lima (--color-bio-lime) é usado SOMENTE para
 * o músculo alvo. Os demais usam um verde apagado ("auxiliar" — troquei
 * o termo técnico "sinergista" por um nome mais direto).
 */
export function MuscleMap({ highlights }: { highlights: MuscleHighlight[] }) {
  const { anteriorData, posteriorData, hasAnterior, hasPosterior, alvoNomes, auxiliarNomes } = useMemo(() => {
    const anterior: IExerciseData[] = []
    const posterior: IExerciseData[] = []
    const alvo: string[] = []
    const auxiliar: string[] = []

    for (const h of highlights) {
      const nome = muscleDisplayName(h.pathId)
      if (h.role === 'alvo') alvo.push(nome)
      else auxiliar.push(nome)

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
      alvoNomes: alvo,
      auxiliarNomes: auxiliar,
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

      {/* Lista por extenso — a cor no boneco mostra ONDE, isso aqui mostra O QUÊ */}
      <div className="w-full max-w-[280px] rounded-bio-md border border-bio-line bg-bio-surface p-3">
        {alvoNomes.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-bio-lime" />
            <p className="font-body text-xs leading-snug text-bio-paper">
              <span className="font-semibold text-bio-lime">Alvo:</span> {alvoNomes.join(', ')}
            </p>
          </div>
        )}
        {auxiliarNomes.length > 0 && (
          <div className={`flex items-start gap-2 ${alvoNomes.length > 0 ? 'mt-2' : ''}`}>
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: bioSynergist }} />
            <p className="font-body text-xs leading-snug text-bio-paper">
              <span className="font-semibold" style={{ color: bioSynergist }}>
                Auxiliar:
              </span>{' '}
              {auxiliarNomes.join(', ')}
            </p>
          </div>
        )}
        <p className="mt-2 border-t border-bio-line pt-2 font-body text-[10px] leading-snug text-bio-ink-soft">
          "Auxiliar" (também chamado de sinergista) é o músculo que ajuda no movimento, mas não é o
          foco principal do exercício.
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
