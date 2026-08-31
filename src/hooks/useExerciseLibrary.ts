import { useEffect, useState } from 'react'
import type { Exercise } from '@/types'
import { exercises as localExercises } from '@/data/exercises'
import { getExerciseLibrary } from '@/services/exerciseApi'
import { adaptExerciseDbList } from '@/lib/exerciseDbAdapter'

export type LibrarySource = 'exercisedb' | 'local-fallback'

interface UseExerciseLibraryResult {
  exercises: Exercise[]
  loading: boolean
  source: LibrarySource
  error: string | null
}

/**
 * useExerciseLibrary
 * -------------------
 * Fonte primária: nossa biblioteca local (`src/data/exercises.ts` — 46
 * exercícios curados à mão + ~530 importados do dataset open-source
 * exercicios-bd-ptbr/free-exercise-db, cobrindo os 12 grupos musculares
 * com todo tipo de equipamento e SEMPRE com foto real).
 *
 * Complemento opcional: se o exercisedb-api externo responder, seus
 * exercícios são ACRESCENTADOS à lista local (nunca a substituem) — dá
 * mais variedade quando ele está no ar, sem depender dele pra cobertura
 * básica, já que o próprio endpoint gratuito não garante uptime.
 */
export function useExerciseLibrary(): UseExerciseLibraryResult {
  const [state, setState] = useState<UseExerciseLibraryResult>({
    exercises: localExercises,
    loading: true,
    source: 'local-fallback',
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    getExerciseLibrary().then((raw) => {
      if (cancelled) return
      if (!raw || raw.length === 0) {
        setState({
          exercises: localExercises,
          loading: false,
          source: 'local-fallback',
          error: null,
        })
        return
      }
      // Mescla: local primeiro (garantido), API depois — descartando da
      // API qualquer exercício com nome muito parecido a um já local,
      // pra evitar duplicata óbvia mostrada duas vezes ao usuário.
      const localNames = new Set(localExercises.map((e) => e.name.toLowerCase().trim()))
      const extra = adaptExerciseDbList(raw).filter((e) => !localNames.has(e.name.toLowerCase().trim()))
      setState({
        exercises: [...localExercises, ...extra],
        loading: false,
        source: 'exercisedb',
        error: null,
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
