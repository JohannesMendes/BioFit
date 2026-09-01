import type { Muscle } from 'react-body-highlighter'

export type BodyView = 'anterior' | 'posterior'

/**
 * Mapa dos nossos pathId internos (usados em `muscleHighlights`, os
 * mesmos desde a v1 do app) para os slugs de músculo da biblioteca
 * react-body-highlighter (MIT, github.com/giavinh79/react-body-highlighter)
 * — corpo anatômico de verdade, não os blocos geométricos que
 * desenhamos à mão antes.
 *
 * Não precisamos alterar nenhum dos 564 exercícios: eles continuam
 * referenciando os mesmos pathId de sempre, só a peça visual que os
 * desenha mudou.
 */
export const PATH_ID_TO_BODY_MUSCLE: Record<string, { slug: Muscle; view: BodyView }> = {
  'deltoide-anterior': { slug: 'front-deltoids', view: 'anterior' },
  'deltoide-lateral': { slug: 'front-deltoids', view: 'anterior' },
  'peitoral-maior': { slug: 'chest', view: 'anterior' },
  biceps: { slug: 'biceps', view: 'anterior' },
  'reto-abdominal': { slug: 'abs', view: 'anterior' },
  'transverso-abdominal': { slug: 'obliques', view: 'anterior' },
  quadriceps: { slug: 'quadriceps', view: 'anterior' },
  'trapezio-superior': { slug: 'trapezius', view: 'posterior' },
  'grande-dorsal': { slug: 'upper-back', view: 'posterior' },
  triceps: { slug: 'triceps', view: 'posterior' },
  'eretores-espinha': { slug: 'lower-back', view: 'posterior' },
  'gluteo-maximo': { slug: 'gluteal', view: 'posterior' },
  isquiotibiais: { slug: 'hamstring', view: 'posterior' },
  gastrocnemio: { slug: 'calves', view: 'posterior' },
}
