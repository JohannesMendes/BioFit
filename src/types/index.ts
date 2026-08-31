export type Environment = 'academia' | 'casa'

export type Equipment =
  | 'Halter'
  | 'Barra'
  | 'Polia'
  | 'Máquina'
  | 'Peso Corporal'
  | 'Kettlebell'
  | 'Elástico'
  | 'Banco'

export type MuscleGroupId =
  | 'peito'
  | 'costas'
  | 'ombros'
  | 'biceps'
  | 'triceps'
  | 'quadriceps'
  | 'posterior'
  | 'gluteos'
  | 'panturrilha'
  | 'abdomen'
  | 'lombar'
  | 'mobilidade'

export interface MuscleGroup {
  id: MuscleGroupId
  name: string
  region: 'superiores' | 'inferiores' | 'core'
  coverImage: string
  /** Cor de acento exclusiva do grupo — usada no glow, ícone e badge do card da Home. */
  accent: string
  /** Selo curto (padrão dos apps de referência: "CHEST", "BACK"...) — reforça o nome em inglês. */
  tag: string
  /** Selo secundário — o "tipo" de estímulo do grupo (ex.: Isolamento, Composto). */
  subtag: string
}

export interface MuscleHighlight {
  /** id do path no MuscleMap SVG */
  pathId: string
  role: 'alvo' | 'sinergista'
}

export interface Exercise {
  id: string
  name: string
  muscleGroups: MuscleGroupId[]
  equipment: Equipment
  environment: Environment[]
  thumbnail: string
  videoLoop?: string
  difficulty: 'iniciante' | 'intermediário' | 'avançado'
  muscleHighlights: MuscleHighlight[]
  media: {
    photoStart: string
    photoEnd: string
  }
  explanation: {
    simples: string
    biomecanica: {
      articulacoes: string
      vetorForca: string
      amplitude: string
    }
  }
  fichaTecnica: {
    equipamentosNecessarios: string[]
    errosComuns: string[]
    substitutos: string[] // ids de outros exercícios
  }
}
