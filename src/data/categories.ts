import type { MuscleGroup } from '@/types'

/**
 * Cada grupo ganhou uma cor de acento própria (glow + selo do card na Home).
 * O verde-lima (--color-bio-lime) continua exclusivo do estado "ativo/alvo"
 * em outras telas — aqui é só para diferenciar os grupos visualmente,
 * igual às tags coloridas do mock de referência (CHEST, BACK, SHOULDERS...).
 */
export const muscleGroups: MuscleGroup[] = [
  { id: 'peito', name: 'Peito', region: 'superiores', coverImage: 'peito', accent: '#C6FF3A', tag: 'CHEST', subtag: 'Empurrar' },
  { id: 'costas', name: 'Costas', region: 'superiores', coverImage: 'costas', accent: '#4EA8FF', tag: 'BACK', subtag: 'Postura' },
  { id: 'ombros', name: 'Ombros', region: 'superiores', coverImage: 'ombros', accent: '#B98CFF', tag: 'SHOULDERS', subtag: 'Estabilidade' },
  { id: 'biceps', name: 'Bíceps', region: 'superiores', coverImage: 'biceps', accent: '#FF9F45', tag: 'BICEPS', subtag: 'Isolamento' },
  { id: 'triceps', name: 'Tríceps', region: 'superiores', coverImage: 'triceps', accent: '#FF6B4A', tag: 'TRICEPS', subtag: 'Extensão' },
  { id: 'quadriceps', name: 'Quadríceps', region: 'inferiores', coverImage: 'quadriceps', accent: '#FF5FA2', tag: 'LEGS', subtag: 'Composto' },
  { id: 'posterior', name: 'Posterior', region: 'inferiores', coverImage: 'posterior', accent: '#2FD9C4', tag: 'HAMSTRINGS', subtag: 'Posterior' },
  { id: 'gluteos', name: 'Glúteos', region: 'inferiores', coverImage: 'gluteos', accent: '#FFD23F', tag: 'GLUTES', subtag: 'Potência' },
  { id: 'panturrilha', name: 'Panturrilha', region: 'inferiores', coverImage: 'panturrilha', accent: '#5FD0FF', tag: 'CALVES', subtag: 'Estabilidade' },
  { id: 'abdomen', name: 'Abdômen', region: 'core', coverImage: 'abdomen', accent: '#7ED957', tag: 'CORE', subtag: 'Resistência' },
  { id: 'lombar', name: 'Lombar', region: 'core', coverImage: 'lombar', accent: '#8C9EFF', tag: 'LOWER BACK', subtag: 'Sustentação' },
  { id: 'mobilidade', name: 'Mobilidade', region: 'core', coverImage: 'mobilidade', accent: '#63E6BE', tag: 'MOBILITY', subtag: 'Amplitude' },
]

export const regionLabels: Record<MuscleGroup['region'], string> = {
  superiores: 'Superiores',
  inferiores: 'Inferiores',
  core: 'Core & Mobilidade',
}
