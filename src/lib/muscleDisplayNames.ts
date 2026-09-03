/**
 * Nome em português "de gente" para cada pathId usado em
 * `muscleHighlights` no catálogo inteiro (ver src/data/exercises.ts).
 * Usado pra escrever por extenso, embaixo do boneco anatômico, quais
 * músculos aquele exercício realmente ativa — não só colorir a região.
 */
export const MUSCLE_DISPLAY_NAMES: Record<string, string> = {
  'deltoide-anterior': 'Deltoide anterior (ombro)',
  'deltoide-lateral': 'Deltoide lateral (ombro)',
  'peitoral-maior': 'Peitoral maior',
  biceps: 'Bíceps',
  'reto-abdominal': 'Reto abdominal',
  'transverso-abdominal': 'Transverso/oblíquos abdominais',
  quadriceps: 'Quadríceps',
  'trapezio-superior': 'Trapézio',
  'grande-dorsal': 'Grande dorsal (costas)',
  triceps: 'Tríceps',
  'eretores-espinha': 'Eretores da espinha (lombar)',
  'gluteo-maximo': 'Glúteo máximo',
  isquiotibiais: 'Isquiotibiais (posterior de coxa)',
  gastrocnemio: 'Gastrocnêmio (panturrilha)',
}

export function muscleDisplayName(pathId: string): string {
  return MUSCLE_DISPLAY_NAMES[pathId] ?? pathId
}
