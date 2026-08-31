import type { MuscleGroupId } from '@/types'

/**
 * CategoryMuscleIcon
 * -------------------
 * Silhueta anatômica compacta (frente ou costas) com a região do grupo
 * muscular destacada em verde-lima — usada como arte de fundo dos cards
 * de categoria da Home, no lugar do antigo quadrado de ícone cinza
 * genérico (que ficava "quebrado" visualmente por não representar nada).
 *
 * Reaproveita a mesma lógica de destaque do MuscleMap (cor = músculo
 * alvo), só que numa silhueta simplificada, maior e mais decorativa —
 * pensada para caber atrás do texto do card com baixa opacidade.
 */

type ViewSide = 'frente' | 'costas'

const GROUP_VIEW: Record<MuscleGroupId, ViewSide> = {
  peito: 'frente',
  ombros: 'frente',
  biceps: 'frente',
  quadriceps: 'frente',
  abdomen: 'frente',
  costas: 'costas',
  triceps: 'costas',
  posterior: 'costas',
  gluteos: 'costas',
  panturrilha: 'costas',
  lombar: 'costas',
  mobilidade: 'frente',
}

// Região destacada no silhueta para cada grupo — reaproveita o mesmo
// desenho de corpo do MuscleMap, simplificado.
const HIGHLIGHT_PATH: Partial<Record<MuscleGroupId, string>> = {
  peito: 'M76 64 Q100 58 124 64 L120 100 Q100 108 80 100 Z',
  ombros: 'M62 66 Q52 78 56 100 L74 96 L70 62 Z M138 66 Q148 78 144 100 L126 96 L130 62 Z',
  biceps: 'M56 100 L52 138 L70 140 L74 100 Z M144 100 L148 138 L130 140 L126 100 Z',
  quadriceps: 'M76 150 L94 152 L92 224 L72 222 Z M124 150 L106 152 L108 224 L128 222 Z',
  abdomen: 'M84 104 L116 104 L114 138 L86 138 Z',
  costas: 'M78 82 Q100 92 122 82 L128 128 Q100 138 72 128 Z',
  triceps: 'M56 100 L52 138 L70 140 L74 100 Z M144 100 L148 138 L130 140 L126 100 Z',
  posterior: 'M76 194 L94 196 L92 224 L72 222 Z M124 194 L106 196 L108 224 L128 222 Z',
  gluteos: 'M74 160 L126 160 L122 190 Q100 198 78 190 Z',
  panturrilha: 'M74 232 L92 234 L88 300 L76 298 Z M126 232 L108 234 L112 300 L124 298 Z',
  lombar: 'M92 130 L108 130 L106 158 L94 158 Z',
}

export function CategoryMuscleIcon({
  groupId,
  className = '',
}: {
  groupId: MuscleGroupId
  className?: string
}) {
  const side = GROUP_VIEW[groupId]
  const highlight = HIGHLIGHT_PATH[groupId]

  return (
    <svg
      viewBox="0 0 200 320"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* Silhueta base — sempre neutra e discreta */}
      <g fill="var(--color-bio-line)" opacity="0.55">
        <circle cx="100" cy="35" r="22" />
        <path d="M70 58 Q100 50 130 58 L138 140 Q100 155 62 140 Z" />
        <path d="M62 140 L58 230 L74 232 L78 145 Z" />
        <path d="M138 140 L142 230 L126 232 L122 145 Z" />
        <path d="M74 228 L70 300 L92 302 L96 232 Z" />
        <path d="M126 228 L130 300 L108 302 L104 232 Z" />
      </g>
      {/* Destaque do grupo muscular alvo desta categoria */}
      {highlight && <path d={highlight} fill="var(--color-bio-lime)" opacity="0.9" />}
      {/* Espelha uma indicação leve de lado (frente/costas) via um traço central sutil */}
      {side === 'costas' && (
        <line x1="100" y1="60" x2="100" y2="230" stroke="var(--color-bio-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
      )}
    </svg>
  )
}
