import type { MuscleGroupId } from '@/types'

/**
 * exerciseFallbackTips.ts
 * ------------------------------------------------------------------------
 * Quando o exercisedb-api (free tier) não retorna um dado estruturado
 * (vetor de força, erros comuns, etc.), o adaptador NÃO deve mostrar isso
 * pro usuário como uma mensagem de erro/aviso técnico ("tier gratuito",
 * "RapidAPI" etc.) — isso é informação de debug, não conteúdo de produto.
 *
 * Este módulo guarda dicas genéricas (mas úteis) por grupo muscular, pra
 * preencher esses campos com algo educativo em vez de um aviso técnico.
 * São generalizações conscientes — não afirmam precisão que não temos —
 * mas ainda assim comunicam algo real sobre o padrão de movimento típico
 * daquele grupo, então valem mais que "erro: dado indisponível".
 */

export const FORCE_VECTOR_TIP_PT: Record<MuscleGroupId, string> = {
  peito: 'Nos exercícios de peito, a força costuma ser aplicada para a frente e para cima, afastando os braços do tronco.',
  costas: 'Nos exercícios de costas, a força puxa o peso em direção ao corpo, aproximando a escápula da coluna.',
  ombros: 'Nos exercícios de ombro, a força eleva o braço para cima ou para os lados a partir da articulação do ombro.',
  biceps: 'Nos exercícios de bíceps, a força flexiona o cotovelo, aproximando o antebraço do braço.',
  triceps: 'Nos exercícios de tríceps, a força estende o cotovelo, afastando o antebraço do braço.',
  quadriceps: 'Nos exercícios de quadríceps, a força estende o joelho, "empurrando" o corpo para cima ou para a frente.',
  posterior: 'Nos exercícios de posterior de coxa, a força flexiona o joelho ou estende o quadril.',
  gluteos: 'Nos exercícios de glúteos, a força estende o quadril, empurrando o corpo para frente ou para cima.',
  panturrilha: 'Nos exercícios de panturrilha, a força eleva o calcanhar, projetando o corpo para cima na ponta dos pés.',
  abdomen: 'Nos exercícios de abdômen, a força flexiona ou estabiliza o tronco, resistindo ao movimento.',
  lombar: 'Nos exercícios de lombar, a força estende ou estabiliza a coluna, mantendo o tronco ereto.',
  mobilidade: 'Aqui o foco está mais em amplitude e controle do movimento do que em força bruta numa única direção.',
}

const DEFAULT_FORCE_VECTOR_TIP =
  'A direção da força varia conforme a execução — o foco principal aqui é manter o controle durante toda a amplitude do movimento.'

export function getForceVectorTip(group: MuscleGroupId): string {
  return FORCE_VECTOR_TIP_PT[group] ?? DEFAULT_FORCE_VECTOR_TIP
}
