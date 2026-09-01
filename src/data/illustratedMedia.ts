import supermanA from '@/assets/illustrations/superman-a.svg'
import supermanB from '@/assets/illustrations/superman-b.svg'
import mobilidadeA from '@/assets/illustrations/mobilidade-quadril-90-90-a.svg'
import mobilidadeB from '@/assets/illustrations/mobilidade-quadril-90-90-b.svg'
import ombroA from '@/assets/illustrations/alongamento-dinamico-ombro-a.svg'
import ombroB from '@/assets/illustrations/alongamento-dinamico-ombro-b.svg'
import crucifixoA from '@/assets/illustrations/crucifixo-maquina-a.svg'
import crucifixoB from '@/assets/illustrations/crucifixo-maquina-b.svg'

/**
 * illustratedMedia.ts
 * ------------------------------------------------------------------------
 * Só para os 4 exercícios curados em que a busca no free-exercise-db não
 * achou nenhuma foto do exercício certo (ver curatedMediaOverrides.ts) —
 * em vez de deixar sem nada, desenhamos uma ilustração própria simples
 * (dois quadros, mesma lógica de "início/fim" das fotos reais) pra dar
 * uma ideia visual da execução. É estilizado de propósito — não finge
 * ser foto.
 */
export const illustratedMedia: Record<string, { photoStart: string; photoEnd: string }> = {
  superman: { photoStart: supermanA, photoEnd: supermanB },
  'mobilidade-quadril-90-90': { photoStart: mobilidadeA, photoEnd: mobilidadeB },
  'alongamento-dinamico-ombro': { photoStart: ombroA, photoEnd: ombroB },
  'crucifixo-maquina': { photoStart: crucifixoA, photoEnd: crucifixoB },
}
