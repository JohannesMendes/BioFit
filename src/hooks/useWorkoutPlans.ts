import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import type { WorkoutPlan, WorkoutPlanItem } from '@/types'

/**
 * useWorkoutPlans
 * -----------------------------------------------------------------
 * Persistência das fichas de treino (A, B, C, D...) — POR USUÁRIO.
 *
 * Guardado em localStorage, com a chave amarrada ao e-mail de quem
 * está logado (`biofit_workout_plans_<email>`). Isso resolve dois
 * pontos: (1) exige login pra montar ficha — sem `user`, este hook
 * simplesmente não deixa criar/editar nada; (2) se duas pessoas
 * usarem o mesmo navegador/aparelho, cada uma só vê a sua própria
 * lista, nunca a da outra.
 *
 * Continua tudo no aparelho da pessoa (localStorage), não em nuvem —
 * era isso que foi pedido. Se um dia quiser sincronizar entre
 * aparelhos, aí sim precisaria de Firestore (ou similar) por trás
 * dessa mesma interface (create/update/remove/reorder).
 */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function storageKey(email: string) {
  return `biofit_workout_plans_${email.toLowerCase()}`
}

function loadPlans(email: string): WorkoutPlan[] {
  try {
    const raw = localStorage.getItem(storageKey(email))
    if (!raw) return []
    const parsed = JSON.parse(raw) as WorkoutPlan[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function savePlans(email: string, plans: WorkoutPlan[]) {
  try {
    localStorage.setItem(storageKey(email), JSON.stringify(plans))
  } catch {
    // localStorage indisponível (modo privado, quota cheia etc.) — ficha
    // segue funcionando na sessão atual, só não persiste entre sessões.
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function useWorkoutPlans() {
  const { user } = useAuth()
  const [plans, setPlans] = useState<WorkoutPlan[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user) {
      setPlans([])
      setLoaded(true)
      return
    }
    setPlans(loadPlans(user.email))
    setLoaded(true)
  }, [user])

  const persist = useCallback(
    (next: WorkoutPlan[]) => {
      if (!user) return
      setPlans(next)
      savePlans(user.email, next)
    },
    [user]
  )

  const nextLetter = useCallback(
    (currentPlans: WorkoutPlan[] = plans) => {
      const used = new Set(currentPlans.map((p) => p.letra))
      return LETTERS.split('').find((l) => !used.has(l)) ?? `${currentPlans.length + 1}`
    },
    [plans]
  )

  const createPlan = useCallback(
    (nome: string) => {
      if (!user) return null
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
    [user, plans, persist, nextLetter]
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
    isLoggedIn: !!user,
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
