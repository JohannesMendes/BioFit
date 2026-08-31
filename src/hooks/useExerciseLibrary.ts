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
 * Fonte primária: exercisedb-api (GIFs reais, dataset amplo).
 * Fonte de fallback: nossa biblioteca local curada (`src/data/exercises.ts`),
 * usada automaticamente se a API externa falhar (rede, CORS, rate limit,
 * instabilidade — o próprio endpoint gratuito não garante uptime).
 *
 * Isso é resolvido uma vez por sessão (a API service já cacheia em
 * memória), então trocar de tela não reconsulta a rede.
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
          error: 'Não foi possível carregar o exercisedb-api agora — mostrando a biblioteca local do BioFit.',
        })
        return
      }
      setState({
        exercises: adaptExerciseDbList(raw),
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
