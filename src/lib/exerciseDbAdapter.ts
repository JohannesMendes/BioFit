import type { ExerciseDbExercise } from '@/types/exerciseApi'
import type { Exercise, MuscleGroupId, MuscleHighlight } from '@/types'
import { mapBodyPart, mapEquipment, mapMuscleToSvgPath, inferEnvironment } from '@/lib/exerciseDbMappings'
import { translateExerciseName, translateInstruction, translateMuscleName } from '@/lib/translations'

function cleanInstruction(step: string) {
  // A API prefixa cada passo com "Step:N " — removemos pra não duplicar
  // numeração quando renderizarmos como lista.
  return step.replace(/^step:?\s*\d+\s*/i, '').trim()
}

/**
 * Dicas genéricas por grupo muscular, usadas quando a fonte de dados não
 * tem biomecânica estruturada (vetor de força) ou lista de erros comuns
 * para um exercício específico. Nunca expomos mensagens de "dado ausente
 * no tier gratuito" para o usuário final — isso é debug, não conteúdo.
 */
const GENERIC_MUSCLE_TIPS: Record<MuscleGroupId, { vetorForca: string; erroComum: string }> = {
  peito: {
    vetorForca: 'De forma geral, a força é aplicada perpendicular ao tronco, empurrando a carga para longe do peito — controle a descida para maximizar o trabalho muscular.',
    erroComum: 'Evite arquear demais a lombar ou deixar os ombros subirem em direção às orelhas durante o movimento.',
  },
  costas: {
    vetorForca: 'O movimento costuma puxar a carga em direção ao tronco — inicie puxando com as escápulas antes de flexionar o cotovelo.',
    erroComum: 'Evite usar embalo do corpo (cheating) para compensar a falta de força nos braços.',
  },
  ombros: {
    vetorForca: 'A força é aplicada em elevação ou rotação do braço a partir da articulação do ombro — priorize amplitude controlada sobre carga excessiva.',
    erroComum: 'Evite elevar os ombros junto com o movimento (encolhendo o trapézio) em vez de isolar o deltoide.',
  },
  biceps: {
    vetorForca: 'A força ocorre na flexão do cotovelo, com o antebraço se aproximando do braço — mantenha o cotovelo fixo ao lado do corpo.',
    erroComum: 'Evite balançar o tronco para "ajudar" a subir o peso — isso tira a tensão do bíceps.',
  },
  triceps: {
    vetorForca: 'A força ocorre na extensão do cotovelo — mantenha o braço estável e evite abrir o cotovelo para os lados.',
    erroComum: 'Evite deixar o cotovelo se afastar do corpo, o que reduz o isolamento do tríceps.',
  },
  quadriceps: {
    vetorForca: 'A força é aplicada na extensão do joelho e/ou quadril — mantenha o joelho alinhado com a ponta do pé.',
    erroComum: 'Evite deixar o joelho ultrapassar demais a ponta do pé ou colapsar para dentro.',
  },
  posterior: {
    vetorForca: 'O movimento trabalha a flexão do joelho e/ou extensão do quadril — priorize controle na fase excêntrica (alongamento).',
    erroComum: 'Evite hiperextender a lombar para compensar a falta de mobilidade de quadril.',
  },
  gluteos: {
    vetorForca: 'A força é aplicada na extensão do quadril — contraia o glúteo no topo do movimento em vez de usar apenas a lombar.',
    erroComum: 'Evite compensar com a lombar em vez de ativar o glúteo como motor principal do movimento.',
  },
  panturrilha: {
    vetorForca: 'O movimento é de flexão plantar do tornozelo — priorize amplitude completa em vez de repetições rápidas e curtas.',
    erroComum: 'Evite "quicar" no fundo do movimento, perdendo o controle e a tensão muscular.',
  },
  abdomen: {
    vetorForca: 'A força atua na flexão do tronco ou estabilização da coluna — priorize contração consciente em vez de velocidade.',
    erroComum: 'Evite puxar o pescoço com as mãos em vez de usar o abdômen para iniciar o movimento.',
  },
  lombar: {
    vetorForca: 'O movimento trabalha extensão ou estabilização da coluna — mantenha a coluna em posição neutra durante toda a execução.',
    erroComum: 'Evite arredondar excessivamente a coluna sob carga.',
  },
  mobilidade: {
    vetorForca: 'Este é um movimento predominantemente de mobilidade/cardio — priorize amplitude e ritmo controlado sobre velocidade.',
    erroComum: 'Evite forçar amplitude além do seu limite atual de mobilidade.',
  },
}

/**
 * Converte um exercício do exercisedb-api para a interface `Exercise` que
 * o resto do app já usa (cards, mapa muscular, abas de explicação).
 *
 * Limitações honestas do tier gratuito, tratadas aqui de propósito — mas
 * NUNCA expostas como aviso técnico para o usuário final:
 * - Não há dado de biomecânica estruturado (vetor de força, articulação
 *   específica, grau de alongamento) — só instruções em texto livre.
 *   A aba "Biomecânica Científica" é preenchida com o que dá pra derivar
 *   (músculos alvo/secundários + instruções) e, para o vetor de força
 *   (que a fonte não fornece), usamos uma dica genérica relevante para o
 *   grupo muscular alvo (ver `GENERIC_MUSCLE_TIPS`).
 * - Não há "erros comuns" nem "exercícios substitutos" nesse tier — em vez
 *   de um aviso técnico, mostramos uma dica de segurança genérica para o
 *   grupo muscular; substitutos ficam vazios e a seção correspondente é
 *   ocultada pelo componente quando não há dado.
 * - Só existe 1 GIF por exercício (sem fotos separadas de início/fim) —
 *   os três campos de mídia apontam para a mesma URL.
 * - Nome do exercício, músculos e instruções vêm em inglês da API e são
 *   traduzidos aqui via dicionário PT-BR (`@/lib/translations`) — tradução
 *   "melhor esforço", sem depender de serviço externo.
 */
export function adaptExerciseDbExercise(raw: ExerciseDbExercise): Exercise {
  const equipment = mapEquipment(raw.equipment)
  const primaryGroup = mapBodyPart(raw.bodyPart, raw.target)
  const secondaryGroups = raw.secondaryMuscles
    .map((m) => mapBodyPart(raw.bodyPart, m))
    .filter((g, i, arr) => g !== primaryGroup && arr.indexOf(g) === i)

  const muscleHighlights: MuscleHighlight[] = []
  const targetPath = mapMuscleToSvgPath(raw.target)
  if (targetPath) muscleHighlights.push({ pathId: targetPath, role: 'alvo' })
  for (const m of raw.secondaryMuscles) {
    const path = mapMuscleToSvgPath(m)
    if (path && !muscleHighlights.some((h) => h.pathId === path)) {
      muscleHighlights.push({ pathId: path, role: 'sinergista' })
    }
  }

  // Traduzimos as instruções primeiro (mantendo o texto original como
  // fallback token a token) e usamos a versão PT-BR em toda a UI.
  const instructions = raw.instructions.map((step) => translateInstruction(cleanInstruction(step)))
  const targetPt = translateMuscleName(raw.target)
  const secondaryPt = raw.secondaryMuscles.map(translateMuscleName)
  const tips = GENERIC_MUSCLE_TIPS[primaryGroup]

  return {
    id: raw.id,
    name: translateExerciseName(raw.name),
    muscleGroups: [primaryGroup, ...secondaryGroups],
    equipment,
    environment: inferEnvironment(equipment),
    thumbnail: raw.mediaUrl,
    videoLoop: raw.mediaUrl,
    difficulty: 'intermediário', // não disponível no tier gratuito da API
    muscleHighlights,
    media: { photoStart: raw.mediaUrl, photoEnd: raw.mediaUrl },
    explanation: {
      simples: instructions.length
        ? instructions.slice(0, 3).join(' Em seguida, ') + '.'
        : `Movimento que trabalha principalmente ${targetPt}, usando ${equipment.toLowerCase()}.`,
      biomecanica: {
        articulacoes: `Músculo alvo: ${targetPt}${secondaryPt.length ? `. Músculos secundários: ${secondaryPt.join(', ')}.` : '.'}`,
        // A API não fornece vetor de força estruturado — em vez de expor
        // essa limitação técnica ao usuário, damos uma dica genérica e
        // relevante baseada no grupo muscular alvo do exercício.
        vetorForca: tips.vetorForca,
        amplitude: instructions.length
          ? `Siga a execução completa: ${instructions.join(' → ')}`
          : 'Instruções detalhadas de amplitude não disponíveis para este exercício.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: [equipment],
      // Idem: sem lista de erros comuns vinda da fonte, mostramos uma
      // dica genérica e útil para o grupo muscular em vez de um aviso
      // técnico sobre a origem do dado.
      errosComuns: [tips.erroComum],
      substitutos: [], // relatedExerciseIds só existe no tier pago
    },
  }
}

export function adaptExerciseDbList(list: ExerciseDbExercise[]): Exercise[] {
  return list.map(adaptExerciseDbExercise)
}
