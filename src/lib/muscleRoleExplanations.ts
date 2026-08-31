import type { Exercise, MuscleGroupId } from '@/types'
import { muscleGroups } from '@/data/categories'

/**
 * muscleRoleExplanations.ts
 * ------------------------------------------------------------------------
 * O app não pode ser só um visualizador — cada destaque no mapa muscular
 * (alvo em verde-lima, sinergista em âmbar) precisa vir acompanhado do
 * PORQUÊ: por que aquele grupo é o motor primário do movimento, e como
 * os sinergistas ajudam (estabilização, assistência de força, ou os dois).
 *
 * `MUSCLE_GROUP_ROLE_PT` é um dicionário fixo (12 entradas, uma por
 * MuscleGroupId) com o papel biomecânico central de cada grupo — não
 * depende de nenhuma API, funciona igual pra exercícios do ExerciseDB,
 * da MuscleWiki ou da biblioteca local curada, já que os três já chegam
 * normalizados pro mesmo MuscleGroupId (ver exerciseDbMappings.ts).
 *
 * `buildMuscleRoleExplanation` combina isso com os grupos musculares
 * DAQUELE exercício específico (`exercise.muscleGroups`, onde a posição 0
 * é sempre o alvo — ver exerciseDbAdapter.ts) pra montar duas frases
 * prontas: uma sobre o motor primário, outra sobre os sinergistas
 * (omitida quando o exercício não tem nenhum sinergista mapeado).
 */

export const MUSCLE_GROUP_ROLE_PT: Record<MuscleGroupId, string> = {
  peito: 'flexiona o ombro e aduz o braço à frente do corpo — o motor por trás de qualquer empurrão horizontal, como o supino',
  costas: 'traciona o braço para trás e aproxima as escápulas — o motor por trás de puxadas e remadas',
  ombros: 'eleva e roda o braço no ombro — o motor por trás de desenvolvimentos e elevações',
  biceps: 'flexiona o cotovelo e supina o antebraço — o motor por trás de roscas e da fase de puxada de exercícios compostos',
  triceps: 'estende o cotovelo — o motor por trás de qualquer empurrão (supino, desenvolvimento, extensões)',
  quadriceps: 'estende o joelho — o motor por trás de agachamentos, leg press e cadeira extensora',
  posterior: 'flexiona o joelho e estende o quadril — o motor por trás do levantamento terra e da mesa flexora',
  gluteos: 'estende e roda o quadril — o motor por trás de agachamentos, hip thrust e afundos',
  panturrilha: 'flexiona o tornozelo em direção plantar (empurra o corpo pra cima na ponta do pé) — o motor por trás das elevações de panturrilha',
  abdomen: 'flexiona e estabiliza o tronco — o motor por trás de abdominais, e o estabilizador central em praticamente todo exercício composto',
  lombar: 'estende e estabiliza a coluna — protege a lombar em agachamentos, levantamento terra e remadas',
  mobilidade: 'trabalha amplitude de movimento e controle postural mais do que força bruta isolada',
}

function groupLabel(id: MuscleGroupId): string {
  return muscleGroups.find((g) => g.id === id)?.name ?? id
}

export interface MuscleRoleExplanation {
  primaryGroup: MuscleGroupId
  primaryLabel: string
  primaryText: string
  synergistGroups: MuscleGroupId[]
  synergistLabel: string
  synergistText: string | null
}

/**
 * Monta a explicação de papel muscular pra um exercício específico.
 * Retorna `null` só se o exercício não tiver nenhum grupo muscular
 * mapeado (não deveria acontecer — todo exercício normalizado tem pelo
 * menos o alvo — mas evita quebrar a UI se acontecer).
 */
export function buildMuscleRoleExplanation(exercise: Exercise): MuscleRoleExplanation | null {
  const [primaryGroup, ...rest] = exercise.muscleGroups
  if (!primaryGroup) return null

  const synergistGroups = [...new Set(rest)].filter((g) => g !== primaryGroup)
  const synergistLabel = synergistGroups.map(groupLabel).join(', ')

  return {
    primaryGroup,
    primaryLabel: groupLabel(primaryGroup),
    primaryText: MUSCLE_GROUP_ROLE_PT[primaryGroup],
    synergistGroups,
    synergistLabel,
    synergistText: synergistGroups.length
      ? synergistGroups.map((g) => MUSCLE_GROUP_ROLE_PT[g]).join('; ')
      : null,
  }
}
