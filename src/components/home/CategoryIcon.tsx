import {
  Target,
  Shield,
  Zap,
  BicepsFlexed,
  HandFist,
  Activity,
  Footprints,
  Flame,
  PersonStanding,
  Layers,
  Anchor,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import type { MuscleGroupId } from '@/types'

/**
 * CategoryIcon
 * -------------
 * Ícones prontos da `lucide-react` no lugar de silhuetas anatômicas
 * desenhadas manualmente em SVG — mais limpo, mais leve e consistente
 * com o padrão visual de apps de fitness de referência (Hevy/Fitbod).
 *
 * Cada grupo muscular recebe um ícone semanticamente coerente (não é
 * anatomicamente literal, mas comunica a categoria de forma clara):
 * alvo/força/movimento — sem tentar imitar um atlas muscular real.
 */
const GROUP_ICON: Record<MuscleGroupId, LucideIcon> = {
  peito: Target,
  costas: Shield,
  ombros: Zap,
  biceps: BicepsFlexed,
  triceps: HandFist,
  quadriceps: Activity,
  posterior: Footprints,
  gluteos: Flame,
  panturrilha: PersonStanding,
  abdomen: Layers,
  lombar: Anchor,
  mobilidade: Waves,
}

// Verde-lima neon usado especificamente como acento/glow dos ícones dos
// cards de categoria (tom levemente diferente do --color-bio-lime global,
// por pedido de design específico para esta superfície).
export const CATEGORY_ACCENT = '#D0EF51'

export function CategoryIcon({
  groupId,
  className = '',
  style,
}: {
  groupId: MuscleGroupId
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = GROUP_ICON[groupId]
  return <Icon className={className} style={style} strokeWidth={1.5} />
}
