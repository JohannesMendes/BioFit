import { useMemo, useState } from 'react'
import type { MuscleHighlight } from '@/types'

/**
 * MuscleMap
 * ---------
 * Diagrama anatômico simplificado (frente/costas) em SVG puro — leve,
 * estilizável via CSS/props e fácil de trocar por uma trilha SVG traçada
 * de um atlas real (ex.: Morpho) no futuro, mantendo os mesmos `id`s de
 * grupo muscular usados em `muscleHighlights`.
 *
 * Cor = significado: verde-lima (--color-bio-lime) é usado SOMENTE para o
 * músculo alvo. Sinergistas usam um verde apagado. O resto do corpo fica
 * em contorno neutro — a cor nunca decora, ela sempre informa.
 */

const FRONT_MUSCLES = [
  'deltoide-anterior',
  'deltoide-lateral',
  'peitoral-maior',
  'biceps',
  'reto-abdominal',
  'transverso-abdominal',
  'quadriceps',
]
const BACK_MUSCLES = [
  'trapezio-superior',
  'grande-dorsal',
  'triceps',
  'eretores-espinha',
  'gluteo-maximo',
  'isquiotibiais',
  'gastrocnemio',
]

function fillFor(id: string, map: Map<string, MuscleHighlight['role']>) {
  const role = map.get(id)
  if (role === 'alvo') return 'var(--color-bio-lime)'
  if (role === 'sinergista') return 'var(--color-bio-synergist)'
  return 'var(--color-bio-surface-2)'
}

export function MuscleMap({ highlights }: { highlights: MuscleHighlight[] }) {
  const map = useMemo(
    () => new Map(highlights.map((h) => [h.pathId, h.role] as const)),
    [highlights],
  )

  const hasFront = highlights.some((h) => FRONT_MUSCLES.includes(h.pathId))
  const hasBack = highlights.some((h) => BACK_MUSCLES.includes(h.pathId))
  const [view, setView] = useState<'frente' | 'costas'>(hasFront ? 'frente' : 'costas')

  return (
    <div className="flex flex-col items-center gap-3">
      {hasFront && hasBack && (
        <div className="flex gap-1.5 rounded-bio-pill border border-bio-line bg-bio-surface p-1">
          {(['frente', 'costas'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-bio-pill px-4 py-1 font-body text-xs font-semibold capitalize transition-colors ${
                view === v ? 'bg-bio-lime text-bio-ink' : 'text-bio-ink-soft'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      <svg viewBox="0 0 200 380" width="180" height="340" className="drop-shadow-[0_0_24px_rgba(198,255,58,0.06)]">
        {/* Contorno base do corpo — sempre neutro */}
        <g stroke="var(--color-bio-line)" strokeWidth="1.5" fill="var(--color-bio-surface)">
          <circle cx="100" cy="35" r="22" />
          <path d="M70 58 Q100 50 130 58 L138 140 Q100 155 62 140 Z" />
          <path d="M62 140 L58 230 L74 232 L78 145 Z" />
          <path d="M138 140 L142 230 L126 232 L122 145 Z" />
          <path d="M74 228 L70 320 L92 322 L96 232 Z" />
          <path d="M126 228 L130 320 L108 322 L104 232 Z" />
        </g>

        {view === 'frente' ? (
          <g strokeWidth="1" stroke="var(--color-bio-ink)" strokeOpacity="0.15">
            <path id="deltoide-anterior" d="M62 66 Q52 78 56 100 L74 96 L70 62 Z" fill={fillFor('deltoide-anterior', map)} />
            <path id="deltoide-lateral" d="M62 66 Q52 78 56 100 L74 96 L70 62 Z" fill={fillFor('deltoide-lateral', map)} opacity="0" />
            <path id="deltoide-lateral-r" d="M138 66 Q148 78 144 100 L126 96 L130 62 Z" fill={fillFor('deltoide-lateral', map)} />
            <path id="peitoral-maior" d="M76 64 Q100 58 124 64 L120 100 Q100 108 80 100 Z" fill={fillFor('peitoral-maior', map)} />
            <path id="biceps" d="M56 100 L52 138 L70 140 L74 100 Z" fill={fillFor('biceps', map)} />
            <path id="biceps-r" d="M144 100 L148 138 L130 140 L126 100 Z" fill={fillFor('biceps', map)} />
            <path id="reto-abdominal" d="M84 104 L116 104 L114 138 L86 138 Z" fill={fillFor('reto-abdominal', map)} />
            <path id="transverso-abdominal" d="M76 108 L84 108 L82 136 L74 136 Z" fill={fillFor('transverso-abdominal', map)} />
            <path id="transverso-abdominal-r" d="M124 108 L116 108 L118 136 L126 136 Z" fill={fillFor('transverso-abdominal', map)} />
            <path id="quadriceps" d="M76 150 L94 152 L92 224 L72 222 Z" fill={fillFor('quadriceps', map)} />
            <path id="quadriceps-r" d="M124 150 L106 152 L108 224 L128 222 Z" fill={fillFor('quadriceps', map)} />
          </g>
        ) : (
          <g strokeWidth="1" stroke="var(--color-bio-ink)" strokeOpacity="0.15">
            <path id="trapezio-superior" d="M78 56 Q100 62 122 56 L116 80 Q100 86 84 80 Z" fill={fillFor('trapezio-superior', map)} />
            <path id="grande-dorsal" d="M78 82 Q100 92 122 82 L128 128 Q100 138 72 128 Z" fill={fillFor('grande-dorsal', map)} />
            <path id="triceps" d="M56 100 L52 138 L70 140 L74 100 Z" fill={fillFor('triceps', map)} />
            <path id="triceps-r" d="M144 100 L148 138 L130 140 L126 100 Z" fill={fillFor('triceps', map)} />
            <path id="eretores-espinha" d="M92 130 L108 130 L106 158 L94 158 Z" fill={fillFor('eretores-espinha', map)} />
            <path id="gluteo-maximo" d="M74 160 L126 160 L122 190 Q100 198 78 190 Z" fill={fillFor('gluteo-maximo', map)} />
            <path id="isquiotibiais" d="M76 194 L94 196 L92 224 L72 222 Z" fill={fillFor('isquiotibiais', map)} />
            <path id="isquiotibiais-r" d="M124 194 L106 196 L108 224 L128 222 Z" fill={fillFor('isquiotibiais', map)} />
            <path id="gastrocnemio" d="M74 232 L92 234 L88 300 L76 298 Z" fill={fillFor('gastrocnemio', map)} />
            <path id="gastrocnemio-r" d="M126 232 L108 234 L112 300 L124 298 Z" fill={fillFor('gastrocnemio', map)} />
          </g>
        )}
      </svg>

      <div className="flex items-center gap-4 font-body text-[11px] text-bio-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-bio-lime" /> Alvo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-bio-synergist" /> Sinergista
        </span>
      </div>
    </div>
  )
}
