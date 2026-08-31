/**
 * exerciseDbTranslations.ts
 * ------------------------------------------------------------------------
 * O exercisedb-api (e a MuscleWiki, ver `muscleWikiMappings.ts`) retornam
 * tudo em inglês: nome do exercício, nomes de músculos e instruções em
 * texto livre. Este módulo centraliza a tradução automática pra PT-BR
 * usada pelo adaptador (`exerciseDbAdapter.ts`), separada da taxonomia
 * estrutural que já existe em `exerciseDbMappings.ts` (que mapeia pra IDs
 * internos, não pra texto exibível).
 *
 * Estratégia (honesta sobre suas limitações, como o resto do adaptador):
 * - Nomes de músculo/bodyPart: dicionário fechado (o vocabulário da API
 *   pra isso é pequeno e documentado), então a tradução é 1:1 e confiável.
 * - NOME do exercício: primeiro tenta um dicionário curado com o nome
 *   natural em PT-BR pros ~80 exercícios mais comuns (`EXERCISE_NAME_PT`)
 *   — é o único jeito de evitar a tradução "Google Tradutor" palavra por
 *   palavra pra nomes compostos (ex.: "Development Bradford Press").
 *   Quando não há entrada curada, cai num fallback algorítmico que EXTRAI
 *   a "cabeça de movimento" do nome (press/curl/raise/squat...) e a
 *   recoloca no INÍCIO da frase — no ExerciseDB o padrão é sempre
 *   "[modificadores] [equipamento] [movimento]" (ordem do inglês), mas em
 *   PT-BR o natural é "[movimento] [equipamento/modificadores]" (ex.:
 *   "supino com barra", nunca "barra supino").
 * - INSTRUÇÕES: texto livre, vocabulário praticamente ilimitado. Sem um
 *   serviço de tradução real (não há chave configurada nesse projeto —
 *   ver `.env.example`), usamos tradução frase-a-frase e palavra-a-palavra
 *   com um dicionário de termos comuns do domínio fitness. A parte mais
 *   frágil de qualquer tradução palavra-a-palavra é o artigo/possessivo
 *   ("the"/"your") — traduzir isso sem contexto gramatical gera as
 *   marcas de "tradução robótica" tipo "o/a barra"/"seu/sua ombro".
 *   `translateArticledNouns` resolve isso checando o gênero do
 *   substantivo que vem logo depois (dicionário `NOUN_GENDER_EN`) e
 *   escolhendo o artigo certo ("a barra", nunca "o/a barra"). Qualquer
 *   marca que escapar dessas regras é limpa no fim por
 *   `sanitizeTranslatedText` — uma rede de segurança, não a solução
 *   principal.
 *   Termos fora de todos os dicionários permanecem em inglês em vez de
 *   arriscar uma tradução incorreta.
 */

// -----------------------------------------------------------------------
// Músculos (target / secondaryMuscles) → rótulo exibível em PT-BR
// -----------------------------------------------------------------------
export const MUSCLE_LABEL_PT: Record<string, string> = {
  pectorals: 'Peitoral',
  lats: 'Grande dorsal',
  'upper back': 'Costas superiores',
  traps: 'Trapézio',
  delts: 'Deltoides',
  deltoids: 'Deltoides',
  'levator scapulae': 'Elevador da escápula',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  forearms: 'Antebraços',
  quads: 'Quadríceps',
  quadriceps: 'Quadríceps',
  hamstrings: 'Isquiotibiais',
  glutes: 'Glúteos',
  abductors: 'Abdutores',
  adductors: 'Adutores',
  calves: 'Panturrilhas',
  abs: 'Abdômen',
  abdominals: 'Abdômen',
  'serratus anterior': 'Serrátil anterior',
  spine: 'Coluna',
  'cardiovascular system': 'Sistema cardiovascular',
  // Vocabulário extra do target.Primary/Secondary/Tertiary da MuscleWiki
  // (ver lib/muscleWikiMappings.ts) que não existia no vocabulário do
  // ExerciseDB — juntamos aqui pra `translateMuscleLabel` cobrir as duas
  // fontes com o mesmo dicionário.
  shoulders: 'Ombros',
  chest: 'Peito',
  obliques: 'Oblíquos',
  'mid back': 'Meio das costas',
  'lower back': 'Lombar',
}

// bodyParts (taxonomia ExerciseDB) → rótulo exibível em PT-BR
export const BODY_PART_LABEL_PT: Record<string, string> = {
  chest: 'Peito',
  back: 'Costas',
  shoulders: 'Ombros',
  'upper arms': 'Braços (parte superior)',
  'lower arms': 'Antebraços',
  'upper legs': 'Pernas (parte superior)',
  'lower legs': 'Pernas (parte inferior)',
  waist: 'Cintura/Abdômen',
  cardio: 'Cardio',
  neck: 'Pescoço',
}

/** Traduz um termo de músculo da API. Fallback: capitaliza o original. */
export function translateMuscleLabel(term: string): string {
  const key = term.trim().toLowerCase()
  return MUSCLE_LABEL_PT[key] ?? capitalizeWords(term)
}

/** Traduz uma lista de músculos e junta em uma string legível ("A, B e C"). */
export function translateMuscleList(terms: string[]): string {
  const translated = terms.map(translateMuscleLabel)
  if (translated.length === 0) return ''
  if (translated.length === 1) return translated[0]
  return `${translated.slice(0, -1).join(', ')} e ${translated[translated.length - 1]}`
}

/** Traduz um bodyPart da API. Fallback: capitaliza o original. */
export function translateBodyPartLabel(term: string): string {
  const key = term.trim().toLowerCase()
  return BODY_PART_LABEL_PT[key] ?? capitalizeWords(term)
}

// -----------------------------------------------------------------------
// Vocabulário livre (nomes de exercício + instruções) — tradução
// palavra-a-palavra / frase-a-frase, melhor esforço.
// -----------------------------------------------------------------------

// Frases (multi-palavra) traduzidas antes do dicionário de palavras —
// checadas em ordem, então frases mais específicas/longas vêm primeiro.
// IMPORTANTE: roda ANTES da resolução contextual de artigos (ver
// `translateInstruction`) — senão passagens como "the starting" já
// teriam virado "o inicial" antes do padrão "return to the starting
// position" conseguir bater.
const PHRASE_DICTIONARY: [RegExp, string][] = [
  [/\breturn to (the )?starting position/gi, 'retorne à posição inicial'],
  [/\breturn to (the )?standing position/gi, 'retorne à posição em pé'],
  [/\bstarting position\b/gi, 'posição inicial'],
  [/\bstanding position\b/gi, 'posição em pé'],
  [/\bshoulder[- ]width apart\b/gi, 'na largura dos ombros'],
  [/\bshoulder[- ]width\b/gi, 'largura dos ombros'],
  // Padrões "preposição + altura/ponto" — têm que vir ANTES das versões
  // genéricas sem preposição (ex.: "chest height" sozinho, mais abaixo),
  // senão a versão genérica consome o trecho primeiro e a preposição
  // ("at"/"to") fica órfã, sem poder contrair em "na"/"no".
  [/\bat shoulder height\b/gi, 'na altura dos ombros'],
  [/\bat chest height\b/gi, 'na altura do peito'],
  [/\bat hip height\b/gi, 'na altura do quadril'],
  [/\bat eye level\b/gi, 'na altura dos olhos'],
  [/\bto (the |an |a )?anchor point\b/gi, 'ao ponto de fixação'],
  [/\bat (the |an |a )?anchor point\b/gi, 'no ponto de fixação'],
  [/\bshoulder height\b/gi, 'altura dos ombros'],
  [/\bchest height\b/gi, 'altura do peito'],
  [/\bhip height\b/gi, 'altura do quadril'],
  [/\beye level\b/gi, 'altura dos olhos'],
  [/\boverhead position\b/gi, 'posição acima da cabeça'],
  [/\boverhand grip\b/gi, 'pegada pronada'],
  [/\bunderhand grip\b/gi, 'pegada supinada'],
  [/\banchor point\b/gi, 'ponto de fixação'],
  [/\bcontact point\b/gi, 'ponto de contato'],
  [/\belastic band\b/gi, 'elástico'],
  [/\bresistance band\b/gi, 'elástico'],
  [/\bexercise band\b/gi, 'elástico'],
  [/\bcable machine\b/gi, 'polia'],
  [/\bpull[- ]up bar\b/gi, 'barra fixa'],
  [/\bweight bench\b/gi, 'banco'],
  [/\bexercise mat\b/gi, 'colchonete'],
  [/\byoga mat\b/gi, 'colchonete'],
  [/\bbehind you\b/gi, 'atrás do corpo'],
  [/\bin front of you\b/gi, 'à sua frente'],
  [/\babove you\b/gi, 'acima de você'],
  [/\bbelow you\b/gi, 'abaixo de você'],
  [/\bbeside you\b/gi, 'ao seu lado'],
  [/\bnext to you\b/gi, 'ao lado do corpo'],
  [/\bfacing (the )?ceiling\b/gi, 'voltado para cima'],
  [/\bfacing (the )?floor\b/gi, 'voltado para baixo'],
  [/\bfacing (the )?sky\b/gi, 'voltado para cima'],
  [/\bdownward facing\b/gi, 'olhando para baixo'],
  [/\bupward facing\b/gi, 'olhando para cima'],
  [/\bin front of\b/gi, 'à frente de'],
  [/\bon top of\b/gi, 'em cima de'],
  [/\bslightly bent\b/gi, 'levemente flexionado'],
  [/\bas far as possible\b/gi, 'o máximo possível'],
  [/\bfull range of motion\b/gi, 'amplitude completa de movimento'],
  [/\bbring (it|them) back\b/gi, 'traga de volta'],
  [/\bcome back\b/gi, 'volte'],
  [/\bat a 90[- ]degree angle\b/gi, 'em um ângulo de 90 graus'],
  [/\bpalms facing\b/gi, 'palmas voltadas'],
]

// Gênero gramatical (m/f) dos substantivos em PT-BR mais comuns no
// domínio fitness — usado só pra resolver "the"/"your" com concordância
// de artigo/possessivo correta (ver `translateArticledNouns` abaixo) em
// vez do genérico "o/a"/"seu/sua" que soa como tradução robótica.
// Chaves em inglês (o termo como vem da API), sempre no singular.
const NOUN_GENDER_EN: Record<string, 'm' | 'f'> = {
  bar: 'f',
  barbell: 'f',
  dumbbell: 'm',
  kettlebell: 'm',
  cable: 'f',
  machine: 'f',
  band: 'm',
  bench: 'm',
  rope: 'f',
  handle: 'f',
  pad: 'm',
  floor: 'm',
  ground: 'm',
  wall: 'f',
  chest: 'm',
  back: 'f',
  shoulder: 'm',
  hip: 'm',
  waist: 'f',
  arm: 'm',
  hand: 'f',
  leg: 'f',
  head: 'f',
  torso: 'm',
  spine: 'f',
  neck: 'm',
  body: 'm',
  knee: 'm',
  elbow: 'm',
  foot: 'm',
  weight: 'm',
  position: 'f',
  hips: 'm',
  right: 'f', // "direita"
  left: 'f', // "esquerda"
  heel: 'm',
  rib: 'f',
  thigh: 'f',
  toe: 'm',
  anchor: 'm',
  elastic: 'm',
}

function isPluralNoun(word: string): boolean {
  return /s$/i.test(word) && !/ss$/i.test(word)
}

// Plurais irregulares do vocabulário de instruções (não terminam em "s",
// então escapariam da heurística de `isPluralNoun` acima) — usados pra
// resolver corretamente o número/gênero em `pluralInfo`.
const IRREGULAR_PLURAL_SINGULAR: Record<string, string> = {
  feet: 'foot',
  teeth: 'tooth',
}

// Palavras em inglês SINGULARES cuja tradução em PT-BR é gramaticalmente
// plural (ex.: "back" → "costas") — sem isso, `pluralInfo` concordaria
// artigo/possessivo pelo número do inglês ("sua back" → "sua costas",
// errado) em vez do número real da palavra em português ("suas costas").
const FORCE_PLURAL_PT: Set<string> = new Set(['back'])

/** Resolve se uma palavra em inglês é plural e sua forma singular
 * correspondente — usado pra escolher artigo/possessivo/contração no
 * gênero e número certos (ver `NOUN_GENDER_EN`, `PREP_CONTRACTIONS`). */
function pluralInfo(word: string): { plural: boolean; singular: string } {
  const lower = word.toLowerCase()
  if (IRREGULAR_PLURAL_SINGULAR[lower]) {
    return { plural: true, singular: IRREGULAR_PLURAL_SINGULAR[lower] }
  }
  if (FORCE_PLURAL_PT.has(lower)) {
    return { plural: true, singular: lower }
  }
  const plural = isPluralNoun(lower)
  return { plural, singular: plural ? lower.replace(/s$/, '') : lower }
}

function resolveArticleFor(gender: 'm' | 'f', plural: boolean): string {
  if (plural) return gender === 'f' ? 'as' : 'os'
  return gender === 'f' ? 'a' : 'o'
}

function resolvePossessiveFor(gender: 'm' | 'f', plural: boolean): string {
  if (plural) return gender === 'f' ? 'suas' : 'seus'
  return gender === 'f' ? 'sua' : 'seu'
}

function resolveDemonstrativeFor(which: 'this' | 'that', gender: 'm' | 'f', plural: boolean): string {
  if (which === 'this') {
    if (plural) return gender === 'f' ? 'estas' : 'estes'
    return gender === 'f' ? 'esta' : 'este'
  }
  if (plural) return gender === 'f' ? 'essas' : 'esses'
  return gender === 'f' ? 'essa' : 'esse'
}

// Contrações preposição + artigo definido, por família de preposição —
// cada uma com as 4 formas (singular/plural × masculino/feminino).
const PREP_CONTRACTIONS: Record<string, [string, string, string, string]> = {
  // [masc. singular, fem. singular, masc. plural, fem. plural]
  in: ['no', 'na', 'nos', 'nas'],
  on: ['no', 'na', 'nos', 'nas'],
  at: ['no', 'na', 'nos', 'nas'],
  onto: ['no', 'na', 'nos', 'nas'],
  into: ['no', 'na', 'nos', 'nas'],
  of: ['do', 'da', 'dos', 'das'],
  from: ['do', 'da', 'dos', 'das'],
  off: ['do', 'da', 'dos', 'das'],
  to: ['ao', 'à', 'aos', 'às'],
}

/** "in/on/at/of/from/off/to the NOUN" → contração ("no/na/do/da/ao/à
 * NOUN"), em vez do literal "em o/a NOUN" (a marca mais óbvia de
 * tradução automática malfeita). */
function translatePrepositionArticleNoun(text: string): string {
  return text.replace(
    /\b(in|on|at|onto|into|of|from|off|to)\s+the\s+([a-zA-Z]+)\b/gi,
    (_match, prep: string, noun: string) => {
      const { plural, singular } = pluralInfo(noun)
      const translatedNoun = WORD_DICTIONARY[noun.toLowerCase()] ?? WORD_DICTIONARY[singular] ?? noun.toLowerCase()
      const gender = NOUN_GENDER_EN[noun.toLowerCase()] ?? NOUN_GENDER_EN[singular] ?? 'm'
      const [sm, sf, pm, pf] = PREP_CONTRACTIONS[prep.toLowerCase()]
      const contraction = gender === 'f' ? (plural ? pf : sf) : plural ? pm : sm
      return `${contraction} ${translatedNoun}`
    },
  )
}

/** "the NOUN" / "your NOUN" / "this NOUN" / "that NOUN" → artigo,
 * possessivo ou demonstrativo com concordância de gênero E número
 * resolvida pelo substantivo (ex.: "a barra", "seus pés", "esta
 * posição" — nunca "o/a barra", "seu pés" ou "isso posição"). */
function translateArticledNouns(text: string): string {
  return text.replace(/\b(the|your|this|that)\s+([a-zA-Z]+)\b/gi, (match, det: string, noun: string) => {
    const { plural, singular } = pluralInfo(noun)
    const translatedNoun = WORD_DICTIONARY[noun.toLowerCase()] ?? WORD_DICTIONARY[singular] ?? noun.toLowerCase()
    const gender = NOUN_GENDER_EN[noun.toLowerCase()] ?? NOUN_GENDER_EN[singular] ?? 'm'
    const detLower = det.toLowerCase()
    let replacementDet: string
    if (detLower === 'the') replacementDet = resolveArticleFor(gender, plural)
    else if (detLower === 'your') replacementDet = resolvePossessiveFor(gender, plural)
    else replacementDet = resolveDemonstrativeFor(detLower as 'this' | 'that', gender, plural)
    const result = `${replacementDet} ${translatedNoun}`
    return match[0] === match[0].toUpperCase() ? capitalizeWords(result) : result
  })
}

/** Remove artigos indefinidos do inglês ("a"/"an") do texto ORIGINAL,
 * antes de qualquer tradução — seguro porque roda antes de existir
 * qualquer artigo em PT-BR no texto (evitando o risco de apagar um "a"
 * feminino legítimo que `translateArticledNouns` geraria depois). Em
 * instruções imperativas ("segure a barra com pegada pronada") o
 * artigo indefinido do inglês raramente faz falta em PT-BR. */
function stripEnglishIndefiniteArticles(text: string): string {
  return text.replace(/\b(a|an)\s+(?=[a-zA-Z])/gi, '')
}

// Marcas ruidosas de tradução automática que eventualmente escapam das
// regras acima (ex.: "the"/"your" sem um substantivo reconhecido logo
// depois) — última rede de segurança antes de exibir o texto. Roda no
// fim de `translateInstruction` E `translateExerciseName`.
const NOISE_PATTERNS: [RegExp, string][] = [
  [/\bo\/a\b/gi, 'o'],
  [/\bos\/as\b/gi, 'os'],
  [/\ba\/o\b/gi, 'a'],
  [/\bseu\/sua\b/gi, 'seu'],
  [/\bseus\/suas\b/gi, 'seus'],
  [/\beste\/esta\b/gi, 'este'],
  [/\besse\/essa\b/gi, 'esse'],
  [/\bum\/uma\b/gi, 'um'],
  // Sufixo genérico de gênero "(a)"/"(as)"/"(o)"/"(os)" colado a uma
  // palavra (ex.: "sentado(a)", "ambos(as)") — rede de segurança: o
  // dicionário já não gera mais essa forma (ver WORD_DICTIONARY), mas
  // qualquer texto vindo de fora (API, entrada futura) que já traga esse
  // padrão é normalizado pro masculino singular aqui também.
  [/([a-zà-ú]+)\((as?|os?)\)/gi, '$1'],
  [/\bem a\b/gi, 'na'],
  [/\bem as\b/gi, 'nas'],
  [/\bem o\b/gi, 'no'],
  [/\bem os\b/gi, 'nos'],
  [/\(\s*\)/g, ''],
  // Pontuação duplicada (".." "!!" "??" ",," ou uma vírgula seguida de
  // ponto final) — pode sobrar quando uma frase da API já termina com
  // pontuação e o dicionário de frases acrescenta outra.
  [/([.,;!?]){2,}/g, '$1'],
  [/,\s*\./g, '.'],
  [/\s{2,}/g, ' '],
  [/\s+([,.;!?])/g, '$1'],
]

/** Sanitiza o resultado final de uma tradução automática, removendo
 * marcas robóticas remanescentes (ver `NOISE_PATTERNS`) e normalizando
 * espaçamento. Sempre roda por último — depois dela, nada mais toca o texto. */
export function sanitizeTranslatedText(text: string): string {
  let result = text
  for (const [pattern, replacement] of NOISE_PATTERNS) {
    result = result.replace(pattern, replacement)
  }
  return result.trim()
}

// Palavras/termos isolados. Chaves em minúsculo, sem plural quando possível
// (o substitutor cuida de "s" final separadamente).
const WORD_DICTIONARY: Record<string, string> = {
  step: 'Passo',
  stand: 'fique em pé',
  standing: 'em pé',
  sit: 'sente-se',
  sitting: 'sentado',
  lie: 'deite-se',
  lying: 'deitado',
  kneel: 'ajoelhe-se',
  kneeling: 'ajoelhado',
  grab: 'segure',
  grip: 'pegada',
  hold: 'segure',
  holding: 'segurando',
  lower: 'abaixe',
  lowering: 'abaixando',
  raise: 'levante',
  raising: 'levantando',
  lift: 'levante',
  lifting: 'levantando',
  point: 'aponte',
  pointing: 'apontando',
  push: 'empurre',
  pushing: 'empurrando',
  pull: 'puxe',
  pulling: 'puxando',
  extend: 'estenda',
  extending: 'estendendo',
  bend: 'flexione',
  bending: 'flexionando',
  bent: 'flexionado',
  straighten: 'estique',
  straight: 'reto',
  return: 'retorne',
  repeat: 'repita',
  slowly: 'lentamente',
  quickly: 'rapidamente',
  position: 'posição',
  starting: 'inicial',
  place: 'posicione',
  placing: 'posicionando',
  keep: 'mantenha',
  keeping: 'mantendo',
  engage: 'contraia',
  engaging: 'contraindo',
  squeeze: 'contraia',
  squeezing: 'contraindo',
  contract: 'contraia',
  breathe: 'respire',
  exhale: 'expire',
  inhale: 'inspire',
  feet: 'pés',
  foot: 'pé',
  knees: 'joelhos',
  knee: 'joelho',
  elbows: 'cotovelos',
  elbow: 'cotovelo',
  chest: 'peito',
  back: 'costas',
  shoulders: 'ombros',
  shoulder: 'ombro',
  hips: 'quadris',
  hip: 'quadril',
  waist: 'cintura',
  arms: 'braços',
  arm: 'braço',
  hands: 'mãos',
  hand: 'mão',
  legs: 'pernas',
  leg: 'perna',
  head: 'cabeça',
  torso: 'tronco',
  core: 'core',
  spine: 'coluna',
  neck: 'pescoço',
  body: 'corpo',
  floor: 'chão',
  ground: 'chão',
  bench: 'banco',
  bar: 'barra',
  barbell: 'barra',
  dumbbell: 'halter',
  dumbbells: 'halteres',
  kettlebell: 'kettlebell',
  cable: 'polia',
  machine: 'máquina',
  band: 'elástico',
  handle: 'alça',
  handles: 'alças',
  rope: 'corda',
  pad: 'apoio',
  height: 'altura',
  level: 'nível',
  angle: 'ângulo',
  direction: 'direção',
  top: 'topo',
  bottom: 'base',
  calf: 'panturrilha',
  calves: 'panturrilhas',
  rib: 'costela',
  ribs: 'costelas',
  ribcage: 'caixa torácica',
  thigh: 'coxa',
  thighs: 'coxas',
  anchor: 'ponto de fixação',
  you: 'você',
  grasp: 'segure',
  grasping: 'segurando',
  reach: 'estenda',
  reaching: 'estendendo',
  attach: 'prenda',
  attaching: 'prendendo',
  toe: 'dedo do pé',
  toes: 'dedos dos pés',
  firmly: 'firmemente',
  second: 'segundo',
  seconds: 'segundos',
  minute: 'minuto',
  minutes: 'minutos',
  for: 'por',
  upward: 'para cima',
  downward: 'para baixo',
  ceiling: 'teto',
  sky: 'céu',
  pose: 'postura',
  stretch: 'alongamento',
  stretching: 'alongando',
  // verbo "to be" — comum em instruções tipo "until your arm is fully extended"
  is: 'está',
  are: 'estão',
  was: 'estava',
  extended: 'estendido',
  an: '', // artigo indefinido sem par PT seguro (ver stripEnglishIndefiniteArticles pro "a")
  full: 'completo',
  bring: 'traga',
  bringing: 'trazendo',
  rotate: 'gire',
  rotating: 'girando',
  right: 'direita',
  left: 'esquerda',
  through: 'através de',
  throughout: 'durante',
  off: 'de',
  engaged: 'contraído',
  heel: 'calcanhar',
  heels: 'calcanhares',
  bench_press: 'supino',
  up: 'para cima',
  down: 'para baixo',
  forward: 'para frente',
  backward: 'para trás',
  behind: 'atrás',
  overhead: 'acima da cabeça',
  above: 'acima',
  below: 'abaixo',
  until: 'até',
  then: 'depois',
  and: 'e',
  // "the"/"your" quase sempre são resolvidos ANTES disso, por
  // `translateArticledNouns`/`translatePrepositionArticleNoun` (que
  // escolhem o artigo/possessivo certo pelo gênero do substantivo
  // seguinte). O que sobrar aqui (raro — ex.: "the" sem substantivo
  // reconhecível na frente) é simplesmente omitido, nunca vira "o/a".
  the: '',
  your: '',
  with: 'com',
  without: 'sem',
  facing: 'voltado para',
  apart: 'afastados',
  together: 'juntos',
  wide: 'aberto',
  narrow: 'fechado',
  parallel: 'paralelo',
  perpendicular: 'perpendicular',
  fully: 'completamente',
  each: 'cada',
  side: 'lado',
  sides: 'lados',
  motion: 'movimento',
  movement: 'movimento',
  weight: 'peso',
  resistance: 'resistência',
  tension: 'tensão',
  form: 'postura',
  posture: 'postura',
  control: 'controle',
  controlled: 'controlado',
  pause: 'pausa',
  reps: 'repetições',
  rep: 'repetição',
  set: 'série',
  sets: 'séries',
  // preposições, pronomes e conectivos comuns nas instruções da API
  on: 'em',
  onto: 'sobre',
  in: 'em',
  into: 'em',
  at: 'em',
  to: 'para',
  from: 'de',
  of: 'de',
  as: 'como',
  than: 'que',
  wider: 'mais afastado',
  flat: 'deitado',
  // Pronomes sem substantivo pra concordar — usamos formas neutras
  // ("isso"/"eles") em vez de duplas com barra ("o/a", "os/as").
  it: 'isso',
  them: 'eles',
  this: 'isso',
  that: 'isso',
  one: 'um',
  both: 'ambos',
  either: 'qualquer',
  toward: 'em direção a',
  towards: 'em direção a',
  outward: 'para fora',
  inward: 'para dentro',
  outwards: 'para fora',
  inwards: 'para dentro',
  vertical: 'vertical',
  horizontal: 'horizontal',
  natural: 'natural',
  neutral: 'neutro',
  // termos de músculo que também aparecem no nome de exercícios
  biceps: 'bíceps',
  triceps: 'tríceps',
  quads: 'quadríceps',
  quadriceps: 'quadríceps',
  glutes: 'glúteos',
  glute: 'glúteo',
  hamstring: 'isquiotibial',
  hamstrings: 'isquiotibiais',
  lat: 'dorsal',
  lats: 'dorsais',
  delt: 'deltoide',
  delts: 'deltoides',
  deltoid: 'deltoide',
  deltoids: 'deltoides',
  trap: 'trapézio',
  traps: 'trapézio',
  ab: 'abdominal',
  abs: 'abdômen',
  bodyweight: 'peso corporal',
  slightly: 'levemente',
  seated: 'sentado',
  alternating: 'alternado',
  alternate: 'alternado',
  single: 'unilateral',
  double: 'bilateral',
  close: 'fechado',
  reverse: 'invertido',
  incline: 'inclinado',
  decline: 'declinado',
  assisted: 'assistido',
  weighted: 'com peso',
  isolated: 'isolado',
  underhand: 'pegada supinada',
  overhand: 'pegada pronada',
  supine: 'supinado',
  prone: 'pronado',
}

// Termos do NOME do exercício (equipamento + movimento). Tratados à parte
// porque nomes têm menos "cola" gramatical e pedem tradução mais direta
// (ex.: "bench press" → "supino", não palavra a palavra na mesma ordem).
// Também funciona como o conjunto de "cabeças de movimento" reconhecidas
// pelo fallback algorítmico de `translateExerciseName` (ver abaixo).
const MOVEMENT_NAME_DICTIONARY: Record<string, string> = {
  'bench press': 'supino',
  press: 'press',
  squat: 'agachamento',
  deadlift: 'levantamento terra',
  lunge: 'afundo',
  lunges: 'afundos',
  curl: 'rosca',
  row: 'remada',
  fly: 'crucifixo',
  flye: 'crucifixo',
  flyes: 'crucifixo',
  raise: 'elevação',
  raises: 'elevações',
  'calf raise': 'elevação de panturrilha',
  'calf raises': 'elevação de panturrilha',
  extension: 'extensão',
  crunch: 'abdominal',
  crunches: 'abdominais',
  plank: 'prancha',
  'pull up': 'barra fixa',
  'pull-up': 'barra fixa',
  'chin up': 'barra fixa supinada',
  'push up': 'flexão',
  'push-up': 'flexão',
  pushdown: 'puxada para baixo',
  pulldown: 'puxada',
  pullover: 'pullover',
  shrug: 'encolhimento de ombros',
  shrugs: 'encolhimento de ombros',
  twist: 'torção',
  kickback: 'coice',
  thrust: 'elevação de quadril',
  bridge: 'ponte',
  jump: 'salto',
  hop: 'salto',
  swing: 'balanço',
  clean: 'clean',
  snatch: 'arranco',
  jerk: 'arremesso',
  dip: 'mergulho',
  dips: 'mergulho',
  stepup: 'subida no banco',
  'step up': 'subida no banco',
  'step-up': 'subida no banco',
  climber: 'escalador',
  'good morning': 'bom dia',
  'wood chopper': 'lenhador',
}

// Dicionário curado com o nome NATURAL em PT-BR pros exercícios mais
// comuns do catálogo (chave = nome normalizado, minúsculo, sem pontuação
// — ver `normalizeForLookup`). Verificado primeiro em
// `translateExerciseName`, antes de qualquer tradução algorítmica —
// é a única forma de garantir um nome idiomático (não "traduzido
// palavra por palavra") pros exercícios que o usuário vê com mais
// frequência. Extensível: qualquer nome fora daqui cai no fallback
// algorítmico (extrai a cabeça de movimento + traduz modificadores).
const EXERCISE_NAME_PT: Record<string, string> = {
  'barbell bench press': 'Supino reto com barra',
  'dumbbell bench press': 'Supino reto com halteres',
  'incline barbell bench press': 'Supino inclinado com barra',
  'incline dumbbell bench press': 'Supino inclinado com halteres',
  'decline barbell bench press': 'Supino declinado com barra',
  'decline dumbbell bench press': 'Supino declinado com halteres',
  'close grip bench press': 'Supino pegada fechada',
  'wide grip bench press': 'Supino pegada aberta',
  'smith machine bench press': 'Supino no smith',
  'push up': 'Flexão de braço',
  'wide grip push up': 'Flexão de braço pegada aberta',
  'diamond push up': 'Flexão diamante',
  'decline push up': 'Flexão declinada',
  'incline push up': 'Flexão inclinada',
  'knee push up': 'Flexão de joelhos',
  'barbell squat': 'Agachamento com barra',
  'back squat': 'Agachamento livre',
  'front squat': 'Agachamento frontal',
  'goblet squat': 'Agachamento goblet',
  'bodyweight squat': 'Agachamento livre',
  'dumbbell squat': 'Agachamento com halteres',
  'bulgarian split squat': 'Agachamento búlgaro',
  'hack squat': 'Agachamento hack',
  'sumo squat': 'Agachamento sumô',
  'barbell deadlift': 'Levantamento terra com barra',
  'romanian deadlift': 'Levantamento terra romeno',
  'stiff leg deadlift': 'Levantamento terra pernas rígidas',
  'sumo deadlift': 'Levantamento terra sumô',
  'single leg deadlift': 'Levantamento terra unilateral',
  'barbell bicep curl': 'Rosca direta com barra',
  'dumbbell bicep curl': 'Rosca direta com halteres',
  'hammer curl': 'Rosca martelo',
  'concentration curl': 'Rosca concentrada',
  'preacher curl': 'Rosca scott',
  'ez bar curl': 'Rosca direta com barra w',
  'cable bicep curl': 'Rosca direta na polia',
  'barbell row': 'Remada curvada com barra',
  'dumbbell row': 'Remada curvada com halteres',
  'bent over row': 'Remada curvada',
  'seated cable row': 'Remada sentada na polia',
  't bar row': 'Remada cavalinho',
  'inverted row': 'Remada invertida',
  'lat pulldown': 'Puxada na polia (pulldown)',
  'wide grip lat pulldown': 'Puxada aberta na polia',
  'close grip lat pulldown': 'Puxada fechada na polia',
  'pull up': 'Barra fixa',
  'chin up': 'Barra fixa (pegada supinada)',
  'assisted pull up': 'Barra fixa assistida',
  'shoulder press': 'Desenvolvimento de ombros',
  'dumbbell shoulder press': 'Desenvolvimento com halteres',
  'barbell shoulder press': 'Desenvolvimento com barra',
  'military press': 'Desenvolvimento militar',
  'overhead press': 'Desenvolvimento acima da cabeça',
  'arnold press': 'Desenvolvimento arnold',
  'lateral raise': 'Elevação lateral',
  'dumbbell lateral raise': 'Elevação lateral com halteres',
  'cable lateral raise': 'Elevação lateral na polia',
  'front raise': 'Elevação frontal',
  'rear delt fly': 'Crucifixo invertido',
  'reverse fly': 'Crucifixo invertido',
  'tricep pushdown': 'Tríceps na polia (pushdown)',
  'tricep extension': 'Extensão de tríceps',
  'overhead tricep extension': 'Extensão de tríceps acima da cabeça',
  'skull crusher': 'Tríceps testa',
  'tricep dip': 'Mergulho para tríceps',
  dips: 'Mergulho (dips)',
  'leg press': 'Leg press',
  'leg extension': 'Cadeira extensora',
  'leg curl': 'Mesa flexora',
  'seated leg curl': 'Cadeira flexora',
  'lying leg curl': 'Mesa flexora',
  'calf raise': 'Elevação de panturrilha',
  'seated calf raise': 'Elevação de panturrilha sentado',
  'standing calf raise': 'Elevação de panturrilha em pé',
  'one leg floor calf raise': 'Elevação de panturrilha unilateral no chão',
  'single leg floor calf raise': 'Elevação de panturrilha unilateral no chão',
  'hip thrust': 'Elevação de quadril (hip thrust)',
  'barbell hip thrust': 'Elevação de quadril com barra',
  'glute bridge': 'Ponte de glúteo',
  lunge: 'Afundo',
  lunges: 'Afundos',
  'walking lunge': 'Afundo caminhando',
  'reverse lunge': 'Afundo reverso',
  'dumbbell lunge': 'Afundo com halteres',
  plank: 'Prancha',
  'side plank': 'Prancha lateral',
  crunch: 'Abdominal',
  crunches: 'Abdominais',
  'bicycle crunch': 'Abdominal bicicleta',
  'sit up': 'Abdominal supra',
  'russian twist': 'Torção russa',
  'mountain climber': 'Escalador',
  burpee: 'Burpee',
  'jumping jack': 'Polichinelo',
  'box jump': 'Salto na caixa',
  'kettlebell swing': 'Balanço com kettlebell (swing)',
  'farmers walk': "Caminhada do fazendeiro",
  "farmer's walk": "Caminhada do fazendeiro",
  'face pull': 'Puxada facial (face pull)',
  shrug: 'Encolhimento de ombros',
  shrugs: 'Encolhimento de ombros',
  'good morning': 'Bom dia (good morning)',
  hyperextension: 'Hiperextensão lombar',
  pullover: 'Pullover',
  'cable fly': 'Crucifixo na polia',
  'chest fly': 'Crucifixo',
  'dumbbell fly': 'Crucifixo com halteres',
  'upright row': 'Remada alta',
  'wrist curl': 'Rosca de punho',
  'clean and jerk': 'Arranco e arremesso (clean and jerk)',
  snatch: 'Arranco (snatch)',
  thruster: 'Thruster',
  'step up': 'Subida no banco',
  'donkey kick': 'Coice (donkey kick)',
  'fire hydrant': 'Hidrante (fire hydrant)',
  'v up': 'Abdominal V',
  'flutter kick': 'Tesoura (flutter kick)',
  'wood chopper': 'Lenhador (wood chopper)',
  'landmine press': 'Press landmine',
  // Posturas de yoga (categoria "Yoga" da MuscleWiki, ver
  // muscleWikiMappings.ts) — nomes compostos com palavras (ex.: "Dog",
  // "Pose", "Facing") que o fallback algorítmico não consegue traduzir
  // bem sozinho (não são "cabeça de movimento" nem equipamento), então
  // ficam melhor cobertos aqui, diretamente.
  'downward facing dog': 'Cachorro Olhando para Baixo',
  'downward dog': 'Cachorro Olhando para Baixo',
  'upward facing dog': 'Cachorro Olhando para Cima',
  'upward dog': 'Cachorro Olhando para Cima',
  'child pose': 'Postura da Criança',
  "child's pose": 'Postura da Criança',
  'cobra pose': 'Postura da Cobra',
  'cobra stretch': 'Alongamento Cobra',
  'cat cow': 'Gato-Vaca',
  'cat cow pose': 'Gato-Vaca',
  'cat pose': 'Postura do Gato',
  'cow pose': 'Postura da Vaca',
  'warrior pose': 'Postura do Guerreiro',
  'warrior i': 'Guerreiro I',
  'warrior ii': 'Guerreiro II',
  'warrior 1': 'Guerreiro I',
  'warrior 2': 'Guerreiro II',
  'tree pose': 'Postura da Árvore',
  'triangle pose': 'Postura do Triângulo',
  'bridge pose': 'Postura da Ponte',
  'pigeon pose': 'Postura do Pombo',
  'mountain pose': 'Postura da Montanha',
  'chair pose': 'Postura da Cadeira',
  'camel pose': 'Postura do Camelo',
  'sphinx pose': 'Postura da Esfinge',
  'seated forward bend': 'Flexão Sentada para Frente',
  'standing forward bend': 'Flexão em Pé para Frente',
  'lizard pose': 'Postura do Lagarto',
  'happy baby pose': 'Postura do Bebê Feliz',
  'butterfly stretch': 'Alongamento Borboleta',
  'butterfly pose': 'Postura da Borboleta',
  'low lunge': 'Afundo Baixo',
  'high lunge': 'Afundo Alto',
  'extended puppy pose': 'Postura do Filhote Estendido',
  'corpse pose': 'Postura do Cadáver (savasana)',
  "reclining hand-to-big-toe pose": 'Postura Reclinada Mão-ao-Dedão',
  // Variantes citadas explicitamente como problema — cobertas por nome
  // direto pra não depender só do fallback algorítmico.
  'development bradford press': 'Press Bradford',
  'bradford press': 'Press Bradford',
  'rocky press': 'Press Bradford (rocky press)',
  'bradford rocky press': 'Press Bradford (rocky press)',
  'seated bradford rocky press': 'Press Bradford sentado',
  'barbell bradford rocky press': 'Press Bradford com barra',
  'barbell seated bradford rocky press': 'Press Bradford sentado com barra',
  'seated development bradford press': 'Press Bradford sentado',
  'barbell seated development bradford press': 'Press Bradford sentado com barra',
}

// Frases de modificador (lateralidade/posição) do NOME do exercício,
// tratadas à parte do dicionário de movimento — substituídas ANTES de
// tokenizar, então "one leg"/"floor" já chegam traduzidos no algoritmo
// de reordenação abaixo (ver `translateExerciseName`).
const NAME_MODIFIER_PHRASES: [RegExp, string][] = [
  [/\bone[- ]arm\b/gi, 'unilateral'],
  [/\bone[- ]leg\b/gi, 'unilateral'],
  [/\bsingle[- ]arm\b/gi, 'unilateral'],
  [/\bsingle[- ]leg\b/gi, 'unilateral'],
  [/\bboth[- ]arms?\b/gi, 'bilateral'],
  [/\bboth[- ]legs?\b/gi, 'bilateral'],
  [/\balternating\b/gi, 'alternado'],
  [/\bfloor\b/gi, 'no chão'],
  [/\bground\b/gi, 'no chão'],
]

// Palavras do NOME que devem ser descartadas (não fazem sentido isoladas
// em PT-BR) em vez de traduzidas — evita artigos soltos tipo "o/a" ou
// termos de catálogo redundantes tipo "development" colando no nome.
const NAME_STOPWORDS = new Set(['the', 'a', 'an', 'your', 'development'])

function capitalizeWords(s: string) {
  // Nota: evitamos `\b\w` aqui de propósito — em palavras acentuadas
  // (ex.: "elevação") o `\w` do JS não reconhece "ç"/"ã" como parte da
  // palavra, então o regex tratava "ção" como uma nova palavra e gerava
  // "ElevaçãO". Dividir por espaço e capitalizar só o primeiro char de
  // cada token evita esse bug com acentuação.
  return s
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

function applyPhraseDictionary(text: string): string {
  let result = text
  for (const [pattern, replacement] of PHRASE_DICTIONARY) {
    result = result.replace(pattern, replacement)
  }
  return result
}

function applyWordDictionary(text: string): string {
  return text.replace(/[A-Za-zÀ-ÿ]+/g, (word) => {
    const lower = word.toLowerCase()
    const translated = WORD_DICTIONARY[lower]
    if (translated === undefined) return word
    // preserva capitalização inicial (ex.: início de frase)
    if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
      return translated.charAt(0).toUpperCase() + translated.slice(1)
    }
    return translated
  })
}

/**
 * Traduz um passo de instrução do exercisedb-api (já sem o prefixo
 * "Step:N", removido antes pelo adaptador) para PT-BR, melhor esforço.
 * Ordem importa: frases curadas primeiro (pra não perder padrões como
 * "return to the starting position" pra resolução contextual de artigo
 * mais genérica), depois contrações preposição+artigo, depois
 * artigo/possessivo contextual, depois o dicionário de palavras solto, e
 * por fim o sanitizador — que é sempre a ÚLTIMA rede de segurança.
 * Palavras/termos fora dos dicionários permanecem em inglês.
 */
export function translateInstruction(step: string): string {
  let result = stripEnglishIndefiniteArticles(step)
  result = applyPhraseDictionary(result)
  result = translatePrepositionArticleNoun(result)
  result = translateArticledNouns(result)
  result = applyWordDictionary(result)
  result = sanitizeTranslatedText(result)
  return result ? result.charAt(0).toUpperCase() + result.slice(1) : result
}

function normalizeForLookup(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Traduz o nome do exercício (ex.: "barbell bench press") para PT-BR.
 * 1) Checa o dicionário curado (`EXERCISE_NAME_PT`) — nome natural pros
 *    exercícios mais comuns, verificado primeiro.
 * 2) Sem entrada curada, cai no fallback algorítmico: substitui
 *    modificadores de lateralidade/posição, extrai a cabeça de movimento
 *    (press/curl/raise/squat...) e a recoloca no início — ordem natural
 *    do PT-BR — com os modificadores/equipamento traduzidos depois.
 * Nunca quebra a UI com string vazia: se nada bater, devolve o nome
 * original capitalizado.
 */
export function translateExerciseName(name: string): string {
  const curated = EXERCISE_NAME_PT[normalizeForLookup(name)]
  if (curated) return curated

  let working = name.toLowerCase().trim()
  // Remove pontuação de parênteses/vírgula antes de tokenizar — sem isso,
  // um modificador entre parênteses (ex.: "Assisted Chest Dip (kneeling)")
  // vira o token "(kneeling)" literal, que não bate com nenhuma chave de
  // dicionário (a chave é "kneeling", sem os parênteses) e fica em inglês
  // sem tradução.
  working = working.replace(/[(),]/g, ' ')
  for (const [pattern, replacement] of NAME_MODIFIER_PHRASES) {
    working = working.replace(pattern, replacement)
  }

  const words = working.split(/\s+/).filter(Boolean)

  // Procura a "cabeça de movimento" da direita pra esquerda — pares de 2
  // palavras primeiro (mais específicos, ex.: "calf raise"), depois
  // palavras isoladas (ex.: "press").
  let movementStart = -1
  let movementLen = 0
  let movementPt = ''
  for (let i = words.length - 2; i >= 0; i--) {
    const two = `${words[i]} ${words[i + 1]}`
    if (MOVEMENT_NAME_DICTIONARY[two]) {
      movementStart = i
      movementLen = 2
      movementPt = MOVEMENT_NAME_DICTIONARY[two]
      break
    }
  }
  if (movementStart === -1) {
    for (let i = words.length - 1; i >= 0; i--) {
      if (MOVEMENT_NAME_DICTIONARY[words[i]]) {
        movementStart = i
        movementLen = 1
        movementPt = MOVEMENT_NAME_DICTIONARY[words[i]]
        break
      }
    }
  }

  const modifierWords =
    movementStart === -1 ? words : [...words.slice(0, movementStart), ...words.slice(movementStart + movementLen)]

  const translatedModifiers = modifierWords
    .filter((word) => !NAME_STOPWORDS.has(word))
    .map((word) => MOVEMENT_NAME_DICTIONARY[word] ?? WORD_DICTIONARY[word] ?? word)

  const result = movementPt
    ? [movementPt, ...translatedModifiers].join(' ').trim()
    : translatedModifiers.join(' ').trim()

  const sanitized = sanitizeTranslatedText(result)
  return sanitized ? capitalizeWords(sanitized) : capitalizeWords(name)
}
