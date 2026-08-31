import type { Equipment, MuscleGroupId } from '@/types'

/**
 * muscleWikiMappings.ts
 * ------------------------------------------------------------------------
 * A MuscleWiki usa sua própria taxonomia (`Category` pra equipamento,
 * `target.Primary/Secondary/Tertiary` pra músculos) — diferente da
 * taxonomia do ExerciseDB (ver `exerciseDbMappings.ts`) e, claro, diferente
 * dos nossos IDs internos (MuscleGroupId, Equipment, pathIds do MuscleMap).
 * Este módulo faz essa segunda ponte.
 *
 * Os dicionários abaixo foram construídos a partir dos valores REAIS
 * observados no dataset público da MuscleWiki (`workout-data.json`, ~950
 * exercícios) — não são um chute sobre o que a API "provavelmente" retorna.
 * Assim como em `exerciseDbMappings.ts`, é "melhor esforço": cobre os
 * valores confirmados no dataset, com fallback razoável pra qualquer coisa
 * fora disso (nunca lança erro, nunca quebra a UI).
 */

// Category (MuscleWiki) → nosso Equipment
export const MUSCLEWIKI_CATEGORY_TO_EQUIPMENT: Record<string, Equipment> = {
  dumbbells: 'Halter',
  barbell: 'Barra',
  // "Plate" (anilha avulsa) não tem categoria própria no nosso Equipment —
  // "Halter" é o parente mais próximo (peso livre segurado com as mãos).
  plate: 'Halter',
  bodyweight: 'Peso Corporal',
  yoga: 'Peso Corporal',
  band: 'Elástico',
  kettlebells: 'Kettlebell',
  stretches: 'Peso Corporal',
  cables: 'Polia',
  // TRX é treino em suspensão — sem categoria própria, mas se encaixa no
  // grupo "sem equipamento de academia" junto com peso corporal.
  trx: 'Peso Corporal',
  machine: 'Máquina',
  medicineball: 'Peso Corporal',
}

// target.Primary / Secondary / Tertiary (MuscleWiki) → nosso MuscleGroupId
export const MUSCLEWIKI_TARGET_TO_GROUP: Record<string, MuscleGroupId> = {
  quads: 'quadriceps',
  hamstrings: 'posterior',
  shoulders: 'ombros',
  chest: 'peito',
  lats: 'costas',
  biceps: 'biceps',
  glutes: 'gluteos',
  triceps: 'triceps',
  abdominals: 'abdomen',
  obliques: 'abdomen',
  'mid back': 'costas',
  // Antebraços não têm grupo dedicado no app — mesma aproximação já usada
  // pro `forearms` do ExerciseDB (ver exerciseDbMappings.ts).
  forearms: 'biceps',
  traps: 'ombros',
  calves: 'panturrilha',
  'lower back': 'lombar',
}

// target.Primary / Secondary / Tertiary (MuscleWiki) → pathId do MuscleMap SVG
export const MUSCLEWIKI_TARGET_TO_SVG_PATH: Record<string, string> = {
  quads: 'quadriceps',
  hamstrings: 'isquiotibiais',
  // Sem path dedicado a "ombro" genérico no SVG — usamos o deltoide
  // anterior como aproximação visual, igual ao "delts" do ExerciseDB.
  shoulders: 'deltoide-anterior',
  chest: 'peitoral-maior',
  lats: 'grande-dorsal',
  biceps: 'biceps',
  glutes: 'gluteo-maximo',
  triceps: 'triceps',
  abdominals: 'reto-abdominal',
  // Sem path dedicado a oblíquos — o "transverso-abdominal" é o mais
  // próximo visualmente (lateral do abdômen).
  obliques: 'transverso-abdominal',
  'mid back': 'grande-dorsal',
  traps: 'trapezio-superior',
  calves: 'gastrocnemio',
  'lower back': 'eretores-espinha',
}

// Difficulty (MuscleWiki) → nosso union de dificuldade
const MUSCLEWIKI_DIFFICULTY_MAP: Record<string, 'iniciante' | 'intermediário' | 'avançado'> = {
  beginner: 'iniciante',
  intermediate: 'intermediário',
  advanced: 'avançado',
}

export function mapMuscleWikiCategoryToEquipment(category: string): Equipment {
  return MUSCLEWIKI_CATEGORY_TO_EQUIPMENT[category.toLowerCase()] ?? 'Peso Corporal'
}

export function mapMuscleWikiTargetToGroup(muscle: string): MuscleGroupId | null {
  return MUSCLEWIKI_TARGET_TO_GROUP[muscle.toLowerCase()] ?? null
}

export function mapMuscleWikiTargetToSvgPath(muscle: string): string | null {
  return MUSCLEWIKI_TARGET_TO_SVG_PATH[muscle.toLowerCase()] ?? null
}

/** Retorna `undefined` (em vez de um valor padrão) quando não reconhecido,
 * pra quem chamar decidir o próprio fallback (ex.: manter o que já tinha). */
export function mapMuscleWikiDifficulty(difficulty?: string): 'iniciante' | 'intermediário' | 'avançado' | undefined {
  if (!difficulty) return undefined
  return MUSCLEWIKI_DIFFICULTY_MAP[difficulty.toLowerCase()]
}
