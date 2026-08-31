/**
 * useHomeStats — MOCK de estatísticas para os cards da Home
 * -----------------------------------------------------------------
 * O app ainda não tem um sistema de registro de treinos, então isto
 * segue o mesmo espírito do AuthContext mock: dados de exemplo lidos
 * do localStorage, com uma interface estável para trocar depois por
 * uma fonte real (Firestore, backend próprio, etc.) sem mexer na Home.
 */

const STATS_KEY = 'biofit_home_stats'

export interface HomeStats {
  treinos: number
  metasSemana: { atual: number; meta: number }
  sequenciaDias: number
}

const DEFAULT_STATS: HomeStats = {
  treinos: 0,
  metasSemana: { atual: 0, meta: 4 },
  sequenciaDias: 0,
}

export function useHomeStats(): HomeStats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (!raw) return DEFAULT_STATS
    return { ...DEFAULT_STATS, ...(JSON.parse(raw) as Partial<HomeStats>) }
  } catch {
    return DEFAULT_STATS
  }
}
