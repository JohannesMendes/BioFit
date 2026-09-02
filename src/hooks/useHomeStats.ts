import { useMemo } from 'react'
import { useWorkoutSessions } from '@/hooks/useWorkoutSessions'

/**
 * useHomeStats — calcula os 3 números da Home a partir de treinos
 * concluídos de verdade (useWorkoutSessions), só pra quem está logado.
 * Sem login, tudo fica zerado (a Home mostra um convite pra entrar).
 */

const META_SEMANAL_PADRAO = 4

export interface HomeStats {
  isLoggedIn: boolean
  treinos: number
  metasSemana: { atual: number; meta: number }
  sequenciaDias: number
}

function startOfWeek(d: Date) {
  // semana começando no domingo, pra bater com o resto do app (BR)
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - date.getDay())
  return date
}

function parseLocalDate(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function useHomeStats(): HomeStats {
  const { isLoggedIn, sessions } = useWorkoutSessions()

  return useMemo(() => {
    if (!isLoggedIn) {
      return { isLoggedIn: false, treinos: 0, metasSemana: { atual: 0, meta: META_SEMANAL_PADRAO }, sequenciaDias: 0 }
    }

    const uniqueDays = Array.from(new Set(sessions.map((s) => s.data))).sort()

    const weekStart = startOfWeek(new Date())
    const noSemana = uniqueDays.filter((day) => parseLocalDate(day) >= weekStart).length

    // sequência: dias consecutivos com treino, contando pra trás a partir de hoje
    // (aceita não ter treinado hoje ainda, mas quebra se pular um dia inteiro)
    const daySet = new Set(uniqueDays)
    let streak = 0
    const cursor = new Date()
    cursor.setHours(0, 0, 0, 0)
    // se não treinou hoje, começa a checagem de ontem pra não zerar precocemente
    if (!daySet.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
    while (daySet.has(dateKey(cursor))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }

    return {
      isLoggedIn: true,
      treinos: sessions.length,
      metasSemana: { atual: noSemana, meta: META_SEMANAL_PADRAO },
      sequenciaDias: streak,
    }
  }, [isLoggedIn, sessions])
}

function dateKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
