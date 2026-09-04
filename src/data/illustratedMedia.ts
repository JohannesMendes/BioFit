import mobilidadeA from '@/assets/illustrations/mobilidade-quadril-90-90-a.svg'
import mobilidadeB from '@/assets/illustrations/mobilidade-quadril-90-90-b.svg'
import crucifixoA from '@/assets/illustrations/crucifixo-maquina-a.svg'
import crucifixoB from '@/assets/illustrations/crucifixo-maquina-b.svg'

/**
 * illustratedMedia.ts
 * ------------------------------------------------------------------------
 * Só para os 2 exercícios curados em que a busca (free-exercise-db +
 * Wikimedia Commons) não achou nenhuma foto real do exercício certo
 * (ver curatedMediaOverrides.ts) — em vez de deixar sem nada, desenhamos
 * uma ilustração própria simples (dois quadros, mesma lógica de
 * "início/fim" das fotos reais) pra dar uma ideia visual da execução.
 * É estilizado de propósito — não finge ser foto.
 */
export const illustratedMedia: Record<string, { photoStart: string; photoEnd: string }> = {
  'mobilidade-quadril-90-90': { photoStart: mobilidadeA, photoEnd: mobilidadeB },
  'crucifixo-maquina': { photoStart: crucifixoA, photoEnd: crucifixoB },
}
