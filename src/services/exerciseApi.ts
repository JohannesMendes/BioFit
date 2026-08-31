import type { RawExerciseDbExercise, ExerciseDbExercise } from '@/types/exerciseApi'

/**
 * services/exerciseApi.ts
 * ------------------------------------------------------------------------
 * Consome o exercisedb-api (AscendAPI / ExerciseDB) — repositório open
 * source em github.com/ExerciseDB/exercisedb-api. Usamos a instância
 * gratuita hospedada (sem chave, sem cadastro):
 *
 *   https://oss.exercisedb.dev/api/v1/exercises
 *
 * ⚠️ AVISO DOS PRÓPRIOS MANTENEDORES: esse endpoint gratuito é rotulado
 * como "para exploração, não recomendado para produção" — sujeito a
 * rate limit e instabilidade, sem SLA. Para produção de verdade, o
 * caminho recomendado é:
 *   1. Assinar o plano pago via RapidAPI (dá acesso a imagens/vídeos em
 *      múltiplas resoluções, dificuldade, exercícios relacionados etc. —
 *      ver docs.ascendapi.com/products/edb-v1/overview), OU
 *   2. Rodar sua própria instância (o repositório é open source e tem
 *      deploy de 1 clique pra Vercel).
 * Em qualquer um dos dois casos, o ideal é fazer a chamada a partir do
 * SEU backend (não do browser), para não expor a chave e para poder
 * cachear/normalizar antes de entregar ao app.
 *
 * NÃO TESTADO EM SANDBOX: o ambiente onde este código foi gerado não
 * tem acesso de rede a domínios de terceiros, então esta integração não
 * pôde ser validada contra a API ao vivo. Teste com `npm run dev` e, se
 * algum endpoint/campo tiver mudado, ajuste as constantes abaixo — a
 * documentação interativa fica em https://oss.exercisedb.dev/docs.
 */

const BASE_URL = 'https://oss.exercisedb.dev/api/v1'

// Cache em memória — evita refazer a chamada pesada (a lista completa)
// a cada navegação entre telas durante a mesma sessão.
let cache: ExerciseDbExercise[] | null = null
let inFlight: Promise<ExerciseDbExercise[] | null> | null = null

function normalize(raw: RawExerciseDbExercise): ExerciseDbExercise {
  return {
    id: raw.exerciseId,
    name: raw.name,
    target: raw.targetMuscles[0] ?? '',
    bodyPart: raw.bodyParts[0] ?? '',
    equipment: raw.equipments[0] ?? '',
    secondaryMuscles: raw.secondaryMuscles ?? [],
    instructions: raw.instructions ?? [],
    mediaUrl: raw.gifUrl,
    targetMuscles: raw.targetMuscles ?? [],
    bodyParts: raw.bodyParts ?? [],
    equipments: raw.equipments ?? [],
  }
}

/**
 * Busca a biblioteca completa da API (uma vez, cacheada). Filtros são
 * aplicados no cliente sobre esse cache — decisão deliberada: a doc
 * pública não deixa 100% claro os nomes exatos dos parâmetros de busca
 * por bodyPart/equipment/target no tier gratuito, então filtrar no
 * cliente sobre a lista completa é a forma mais robusta de garantir que
 * a filtragem funcione independente disso.
 *
 * Retorna `null` (em vez de lançar) quando a API falha, para que quem
 * chamar possa cair de volta pro banco de dados local sem quebrar a UI.
 */
export async function getExerciseLibrary(): Promise<ExerciseDbExercise[] | null> {
  if (cache) return cache
  if (inFlight) return inFlight

  inFlight = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/exercises?limit=1500`)
      if (!res.ok) throw new Error(`ExerciseDB respondeu ${res.status}`)
      const data = (await res.json()) as RawExerciseDbExercise[] | { data: RawExerciseDbExercise[] }
      const list = Array.isArray(data) ? data : data.data
      cache = list.map(normalize)
      return cache
    } catch (err) {
      console.warn('[exerciseApi] Falha ao buscar exercisedb-api, caindo para dados locais.', err)
      return null
    } finally {
      inFlight = null
    }
  })()

  return inFlight
}

export function filterByBodyPart(list: ExerciseDbExercise[], bodyPart: string) {
  return list.filter((ex) => ex.bodyParts.some((bp) => bp.toLowerCase() === bodyPart.toLowerCase()))
}

export function filterByEquipment(list: ExerciseDbExercise[], equipment: string) {
  return list.filter((ex) => ex.equipments.some((eq) => eq.toLowerCase() === equipment.toLowerCase()))
}

export function searchByName(list: ExerciseDbExercise[], query: string) {
  const q = query.toLowerCase()
  return list.filter((ex) => ex.name.toLowerCase().includes(q))
}

export function getExerciseById(list: ExerciseDbExercise[], id: string) {
  return list.find((ex) => ex.id === id) ?? null
}
