/**
 * Tipos do exercisedb-api (AscendAPI / ExerciseDB), camada free-tier.
 * ---------------------------------------------------------------------
 * Schema confirmado na documentação oficial (docs.ascendapi.com/products/edb-v1):
 *
 *   {
 *     "exerciseId": "EIeI8Vf",
 *     "name": "barbell bench press",
 *     "gifUrl": "https://static.exercisedb.dev/media/EIeI8Vf.gif",
 *     "targetMuscles": ["pectorals"],
 *     "bodyParts": ["chest"],
 *     "equipments": ["barbell"],
 *     "secondaryMuscles": ["triceps", "shoulders"],
 *     "instructions": ["Step:1 ...", "Step:2 ...", ...]
 *   }
 *
 * IMPORTANTE: o schema real usa `exerciseId` (não `id`) e campos em ARRAY
 * (`targetMuscles`, `bodyParts`, `equipments`) — porque um exercício pode
 * ter mais de um músculo/equipamento associado. Isso é diferente do que
 * foi pedido originalmente (`id`, `target`, `bodyPart`, `equipment` no
 * singular), então `RawExerciseDbExercise` abaixo é fiel ao payload real
 * da rede, e a interface `ExerciseDbExercise` logo depois é a VIEW
 * normalizada com os nomes no singular solicitados — a conversão entre
 * as duas acontece em `services/exerciseApi.ts`.
 */
export interface RawExerciseDbExercise {
  exerciseId: string
  name: string
  gifUrl: string
  targetMuscles: string[]
  bodyParts: string[]
  equipments: string[]
  secondaryMuscles: string[]
  instructions: string[]
}

/**
 * View normalizada com nomes no singular (id, target, bodyPart, equipment)
 * — mantém também os arrays completos (targetMuscles, bodyParts,
 * equipments) para quando um exercício tiver mais de um valor.
 */
export interface ExerciseDbExercise {
  id: string
  name: string
  target: string
  bodyPart: string
  equipment: string
  secondaryMuscles: string[]
  instructions: string[]
  mediaUrl: string // GIF (free tier) — na paga vira vídeo/imagens multi-resolução
  targetMuscles: string[]
  bodyParts: string[]
  equipments: string[]
}
