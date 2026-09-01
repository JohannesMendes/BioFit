import { useCallback, useEffect, useState } from 'react'
import type { WorkoutPlan, WorkoutPlanItem } from '@/types'

/**
 * useWorkoutPlans
 * -----------------------------------------------------------------
 * Persistência das fichas de treino (A, B, C, D...) do usuário.
 *
 * Guardamos em localStorage por enquanto — funciona offline e sem
 * fricção nenhuma. O pedido original também mencionava Firestore
 * (`users/{userId}/fichas`); não wireei isso ainda porque write
 * genérico de sub-coleção arbitrária no Firestore pede regras de
 * segurança e índices configurados no console do Firebase (fora do
 * que dá pra fazer só editando o código do app) — mas a interface
 * deste hook (create/update/remove/reorder) foi pensada pra trocar a
 * implementação por Firestore depois sem mudar nenhuma tela que a usa.
 */

const STORAGE_KEY = 'biofit_workout_plans'
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function loadPlans(): WorkoutPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as WorkoutPlan[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function savePlans(plans: WorkoutPlan[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
  } catch {
    // localStorage indisponível (modo privado, quota cheia etc.) — ficha
    // segue funcionando na sessão atual, só não persiste entre sessões.
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function useWorkoutPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setPlans(loadPlans())
    setLoaded(true)
  }, [])

  const persist = useCallback((next: WorkoutPlan[]) => {
    setPlans(next)
    savePlans(next)
  }, [])

  const nextLetter = useCallback(
    (currentPlans: WorkoutPlan[] = plans) => {
      const used = new Set(currentPlans.map((p) => p.letra))
      return LETTERS.split('').find((l) => !used.has(l)) ?? `${currentPlans.length + 1}`
    },
    [plans]
  )

  const createPlan = useCallback(
    (nome: string) => {
      const plan: WorkoutPlan = {
        id: uid(),
        letra: nextLetter(),
        nome: nome.trim() || 'Novo treino',
        itens: [],
        criadoEm: new Date().toISOString(),
      }
      persist([...plans, plan])
      return plan
    },
    [plans, persist, nextLetter]
  )

  const renamePlan = useCallback(
    (planId: string, nome: string) => {
      persist(plans.map((p) => (p.id === planId ? { ...p, nome: nome.trim() || p.nome } : p)))
    },
    [plans, persist]
  )

  const deletePlan = useCallback(
    (planId: string) => {
      persist(plans.filter((p) => p.id !== planId))
    },
    [plans, persist]
  )

  const addItem = useCallback(
    (planId: string, item: Omit<WorkoutPlanItem, 'id'>) => {
      persist(
        plans.map((p) =>
          p.id === planId ? { ...p, itens: [...p.itens, { ...item, id: uid() }] } : p
        )
      )
    },
    [plans, persist]
  )

  const updateItem = useCallback(
    (planId: string, itemId: string, patch: Partial<Omit<WorkoutPlanItem, 'id'>>) => {
      persist(
        plans.map((p) =>
          p.id !== planId
            ? p
            : { ...p, itens: p.itens.map((it) => (it.id === itemId ? { ...it, ...patch } : it)) }
        )
      )
    },
    [plans, persist]
  )

  const removeItem = useCallback(
    (planId: string, itemId: string) => {
      persist(
        plans.map((p) =>
          p.id !== planId ? p : { ...p, itens: p.itens.filter((it) => it.id !== itemId) }
        )
      )
    },
    [plans, persist]
  )

  const moveItem = useCallback(
    (planId: string, itemId: string, direction: 'up' | 'down') => {
      persist(
        plans.map((p) => {
          if (p.id !== planId) return p
          const idx = p.itens.findIndex((it) => it.id === itemId)
          const swapWith = direction === 'up' ? idx - 1 : idx + 1
          if (idx < 0 || swapWith < 0 || swapWith >= p.itens.length) return p
          const itens = [...p.itens]
          ;[itens[idx], itens[swapWith]] = [itens[swapWith], itens[idx]]
          return { ...p, itens }
        })
      )
    },
    [plans, persist]
  )

  return {
    plans,
    loaded,
    createPlan,
    renamePlan,
    deletePlan,
    addItem,
    updateItem,
    removeItem,
    moveItem,
  }
}
