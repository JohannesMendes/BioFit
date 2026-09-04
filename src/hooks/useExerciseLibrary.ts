import { exercises as localExercises } from '@/data/exercises'
import type { Exercise } from '@/types'

export type LibrarySource = 'local'

interface UseExerciseLibraryResult {
  exercises: Exercise[]
  loading: boolean
  source: LibrarySource
  error: string | null
}

/**
 * useExerciseLibrary
 * -------------------
 * Fonte ÚNICA: nossa biblioteca local (`src/data/exercises.ts` — 46
 * exercícios curados à mão + ~518 importados do dataset open-source
 * exercicios-bd-ptbr/free-exercise-db), cobrindo os 12 grupos musculares
 * com todo tipo de equipamento, nome em português revisado e SEMPRE
 * com foto real.
 *
 * ATÉ 2024-XX a gente também misturava o exercisedb-api externo (ao
 * vivo, oss.exercisedb.dev) como complemento. Foi desligado de
 * propósito: aquela API usa os bonecos animados de fundo branco (não os
 * padrões de foto real que definimos pro app) e o nome dela era
 * traduzido palavra-por-palavra no navegador (é de lá que vinham nomes
 * quebrados tipo "Inverse perna rosca"). O código de integração
 * continua no repo (src/services/exerciseApi.ts,
 * src/lib/exerciseDbAdapter.ts) caso um dia vocês queiram uma fonte
 * paga/própria de GIFs de verdade — só não está mais ligado por padrão.
 */
export function useExerciseLibrary(): UseExerciseLibraryResult {
  return { exercises: localExercises, loading: false, source: 'local', error: null }
}
