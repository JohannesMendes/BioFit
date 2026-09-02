import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

/**
 * useWorkoutSessions
 * -----------------------------------------------------------------
 * Registro de "treino concluído", por usuário logado (mesma lógica de
 * escopo de useWorkoutPlans.ts — chave em localStorage amarrada ao
 * e-mail). É a partir daqui que os 3 números da Home (treinos, metas
 * da semana, sequência) são calculados de verdade, em vez de mock.
 *
 * A pessoa registra um treino concluído a partir do botão "Concluir
 * treino" na tela de uma ficha (TreinoDetail).
 */

export interface WorkoutSession {
  id: string
  planId: string
  /** Data no formato YYYY-MM-DD (dia local), usada pra sequência/semana. */
  data: string
  concluidoEm: string
}

function storageKey(email: string) {
  return `biofit_workout_sessions_${email.toLowerCase()}`
}

function todayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function loadSessions(email: string): WorkoutSession[] {
  try {
    const raw = localStorage.getItem(storageKey(email))
    if (!raw) return []
    const parsed = JSON.parse(raw) as WorkoutSession[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveSessions(email: string, sessions: WorkoutSession[]) {
  try {
    localStorage.setItem(storageKey(email), JSON.stringify(sessions))
  } catch {
    // ver comentário equivalente em useWorkoutPlans.ts
  }
}

export function useWorkoutSessions() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user) {
      setSessions([])
      setLoaded(true)
      return
    }
    setSessions(loadSessions(user.email))
    setLoaded(true)
  }, [user])

  const hasSessionToday = useCallback(
    (planId?: string) => {
      const key = todayKey()
      return sessions.some((s) => s.data === key && (!planId || s.planId === planId))
    },
    [sessions]
  )

  const logSession = useCallback(
    (planId: string) => {
      if (!user) return
      if (hasSessionToday(planId)) return // não deixa contar 2x o mesmo treino no mesmo dia
      const next = [
        ...sessions,
        { id: Math.random().toString(36).slice(2, 10), planId, data: todayKey(), concluidoEm: new Date().toISOString() },
      ]
      setSessions(next)
      saveSessions(user.email, next)
    },
    [user, sessions, hasSessionToday]
  )

  return { isLoggedIn: !!user, sessions, loaded, logSession, hasSessionToday }
}
