import type { Equipment, MuscleGroupId } from '@/types'

/**
 * O exercisedb-api usa uma taxonomia em inglês própria (bodyParts,
 * targetMuscles, equipments) que não bate 1:1 com a nossa (MuscleGroupId,
 * Equipment, e os pathIds do MuscleMap SVG). Estes dicionários fazem essa
 * ponte. São "melhor esforço": cobrem os valores mais comuns do dataset,
 * documentados em docs.ascendapi.com — se a API retornar um valor fora
 * daqui, o adaptador aplica um fallback razoável em vez de quebrar.
 */

// bodyParts (taxonomia ExerciseDB) → nosso MuscleGroupId
export const BODY_PART_TO_GROUP: Record<string, MuscleGroupId> = {
  chest: 'peito',
  back: 'costas',
  shoulders: 'ombros',
  'upper arms': 'biceps', // desambiguado por targetMuscle no adaptador (biceps vs triceps)
  'lower arms': 'biceps', // antebraço — sem grupo dedicado, aproximação
  'upper legs': 'quadriceps', // desambiguado por targetMuscle (quadríceps vs posterior vs glúteos)
  'lower legs': 'panturrilha',
  waist: 'abdomen',
  cardio: 'mobilidade',
  neck: 'mobilidade',
}

// targetMuscles / secondaryMuscles (ExerciseDB) → nosso MuscleGroupId
export const TARGET_MUSCLE_TO_GROUP: Record<string, MuscleGroupId> = {
  pectorals: 'peito',
  lats: 'costas',
  'upper back': 'costas',
  traps: 'ombros',
  delts: 'ombros',
  'levator scapulae': 'ombros',
  biceps: 'biceps',
  triceps: 'triceps',
  forearms: 'biceps',
  quads: 'quadriceps',
  hamstrings: 'posterior',
  glutes: 'gluteos',
  abductors: 'gluteos',
  adductors: 'gluteos',
  calves: 'panturrilha',
  abs: 'abdomen',
  'serratus anterior': 'abdomen',
  spine: 'lombar',
  'cardiovascular system': 'mobilidade',
}

// targetMuscles / secondaryMuscles (ExerciseDB) → pathId do nosso MuscleMap SVG
export const TARGET_MUSCLE_TO_SVG_PATH: Record<string, string> = {
  pectorals: 'peitoral-maior',
  lats: 'grande-dorsal',
  'upper back': 'grande-dorsal',
  traps: 'trapezio-superior',
  delts: 'deltoide-anterior',
  biceps: 'biceps',
  triceps: 'triceps',
  quads: 'quadriceps',
  hamstrings: 'isquiotibiais',
  glutes: 'gluteo-maximo',
  calves: 'gastrocnemio',
  abs: 'reto-abdominal',
  spine: 'eretores-espinha',
}

// equipments (ExerciseDB) → nosso Equipment
export const EQUIPMENT_MAP: Record<string, Equipment> = {
  barbell: 'Barra',
  'ez barbell': 'Barra',
  'olympic barbell': 'Barra',
  'trap bar': 'Barra',
  'smith machine': 'Barra',
  dumbbell: 'Halter',
  hammer: 'Halter',
  cable: 'Polia',
  rope: 'Polia',
  'leverage machine': 'Máquina',
  'sled machine': 'Máquina',
  'stationary bike': 'Máquina',
  'elliptical machine': 'Máquina',
  'stepmill machine': 'Máquina',
  'skierg machine': 'Máquina',
  'upper body ergometer': 'Máquina',
  assisted: 'Máquina',
  'body weight': 'Peso Corporal',
  'bosu ball': 'Peso Corporal',
  'stability ball': 'Peso Corporal',
  'medicine ball': 'Peso Corporal',
  'wheel roller': 'Peso Corporal',
  roller: 'Peso Corporal',
  tire: 'Peso Corporal',
  weighted: 'Peso Corporal',
  band: 'Elástico',
  'resistance band': 'Elástico',
  kettlebell: 'Kettlebell',
}

// Equipamentos que fazem sentido treinar em casa sem estrutura de academia
const HOME_FRIENDLY: Equipment[] = ['Peso Corporal', 'Elástico', 'Halter', 'Kettlebell']

export function inferEnvironment(equipment: Equipment): ('academia' | 'casa')[] {
  return HOME_FRIENDLY.includes(equipment) ? ['academia', 'casa'] : ['academia']
}

export function mapBodyPart(bodyPart: string, targetMuscle: string): MuscleGroupId {
  const key = bodyPart.toLowerCase()
  const target = targetMuscle.toLowerCase()

  // Desambiguação: "upper arms" cobre tanto bíceps quanto tríceps
  if (key === 'upper arms') return target.includes('tricep') ? 'triceps' : 'biceps'
  // "upper legs" cobre quadríceps, posterior de coxa e glúteos
  if (key === 'upper legs') {
    if (target.includes('hamstring')) return 'posterior'
    if (target.includes('glute')) return 'gluteos'
    return 'quadriceps'
  }

  return BODY_PART_TO_GROUP[key] ?? TARGET_MUSCLE_TO_GROUP[target] ?? 'mobilidade'
}

export function mapEquipment(equipment: string): Equipment {
  return EQUIPMENT_MAP[equipment.toLowerCase()] ?? 'Peso Corporal'
}

export function mapMuscleToSvgPath(muscle: string): string | null {
  return TARGET_MUSCLE_TO_SVG_PATH[muscle.toLowerCase()] ?? null
}
