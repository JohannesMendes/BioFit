/**
 * translations.ts
 * ------------------------------------------------------------------------
 * O exercisedb-api devolve tudo em inglês (nome do exercício, músculos,
 * instruções). Como não temos acesso de rede a um serviço de tradução de
 * terceiros neste ambiente, resolvemos isso com dicionários PT-BR
 * "melhor esforço": cobrem o vocabulário mais comum de academia/anatomia
 * e cada função aqui faz fallback gracioso (mantém a palavra original,
 * só capitalizada) quando não reconhece um termo — nunca quebra a UI e
 * nunca mistura idiomas de forma óbvia na maior parte dos casos reais.
 */

// ---------------------------------------------------------------------
// Músculos / grupos anatômicos
// ---------------------------------------------------------------------
export const MUSCLE_TRANSLATIONS: Record<string, string> = {
  pectorals: 'Peitoral',
  chest: 'Peito',
  lats: 'Dorsais',
  'latissimus dorsi': 'Grande Dorsal',
  back: 'Costas',
  'upper back': 'Costas Superior',
  'lower back': 'Lombar',
  traps: 'Trapézio',
  trapezius: 'Trapézio',
  delts: 'Deltoides',
  deltoids: 'Deltoides',
  shoulders: 'Ombros',
  'levator scapulae': 'Levantador da Escápula',
  'rotator cuff': 'Manguito Rotador',
  rhomboids: 'Romboides',
  biceps: 'Bíceps',
  'biceps brachii': 'Bíceps Braquial',
  triceps: 'Tríceps',
  'triceps brachii': 'Tríceps Braquial',
  forearms: 'Antebraço',
  brachialis: 'Braquial',
  brachioradialis: 'Braquiorradial',
  quads: 'Quadríceps',
  quadriceps: 'Quadríceps',
  hamstrings: 'Posteriores de Coxa',
  glutes: 'Glúteos',
  'gluteus maximus': 'Glúteo Máximo',
  abductors: 'Abdutores',
  adductors: 'Adutores',
  calves: 'Panturrilhas',
  gastrocnemius: 'Gastrocnêmio',
  soleus: 'Sóleo',
  abs: 'Abdômen',
  abdominals: 'Abdômen',
  obliques: 'Oblíquos',
  'serratus anterior': 'Serrátil Anterior',
  spine: 'Coluna',
  'erector spinae': 'Eretores da Espinha',
  'hip flexors': 'Flexores do Quadril',
  'cardiovascular system': 'Sistema Cardiovascular',
  neck: 'Pescoço',
  sternocleidomastoid: 'Esternocleidomastóideo',
}

function titleCase(s: string) {
  return s
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Traduz um nome de músculo/parte do corpo vindo da API. Fallback: capitaliza o original. */
export function translateMuscleName(name: string): string {
  const key = name.trim().toLowerCase()
  return MUSCLE_TRANSLATIONS[key] ?? titleCase(key)
}

// ---------------------------------------------------------------------
// Vocabulário de exercícios/instruções (nível de palavra)
// ---------------------------------------------------------------------
// Chaves sempre em minúsculo. Cobre equipamentos, movimentos, posições,
// partes do corpo e conectores mais comuns no dataset do ExerciseDB.
export const EXERCISE_TERM_TRANSLATIONS: Record<string, string> = {
  // equipamentos
  barbell: 'barra',
  dumbbell: 'halter',
  dumbbells: 'halteres',
  cable: 'polia',
  cables: 'polia',
  machine: 'máquina',
  smith: 'smith',
  kettlebell: 'kettlebell',
  band: 'elástico',
  bands: 'elásticos',
  resistance: 'resistência',
  rope: 'corda',
  bench: 'banco',
  rack: 'rack',
  mat: 'colchonete',
  bosu: 'bosu',
  stability: 'estabilidade',
  medicine: 'medicinal',
  ball: 'bola',
  roller: 'rolo',
  wheel: 'roda',
  ez: 'reta w',
  bar: 'barra',
  plate: 'anilha',
  plates: 'anilhas',
  sled: 'trenó',
  leverage: 'alavanca',
  assisted: 'assistido',
  weighted: 'com peso',
  bodyweight: 'peso corporal',
  hammer: 'martelo',
  // movimentos
  press: 'supino',
  squat: 'agachamento',
  deadlift: 'levantamento terra',
  lunge: 'afundo',
  lunges: 'afundos',
  curl: 'rosca',
  row: 'remada',
  raise: 'elevação',
  fly: 'crucifixo',
  flye: 'crucifixo',
  pulldown: 'puxada',
  pullover: 'pullover',
  pull: 'puxada',
  push: 'empurrar',
  pushup: 'flexão',
  'push-up': 'flexão',
  dip: 'mergulho',
  dips: 'mergulhos',
  extension: 'extensão',
  flexion: 'flexão',
  abduction: 'abdução',
  adduction: 'adução',
  crunch: 'abdominal',
  crunches: 'abdominais',
  plank: 'prancha',
  bridge: 'ponte',
  thrust: 'elevação de quadril',
  kickback: 'kickback',
  twist: 'rotação',
  rotation: 'rotação',
  shrug: 'encolhimento',
  shrugs: 'encolhimentos',
  swing: 'balanço',
  clean: 'clean',
  snatch: 'arranco',
  jerk: 'arremesso',
  jump: 'salto',
  jumps: 'saltos',
  step: 'passo',
  climber: 'escalador',
  crossover: 'cruzado',
  walk: 'caminhada',
  march: 'marcha',
  hold: 'segurar',
  drag: 'arrasto',
  carry: 'carregada',
  // posições / orientações
  stand: 'em pé',
  standing: 'em pé',
  seated: 'sentado',
  sitting: 'sentado',
  lying: 'deitado',
  lie: 'deitar',
  kneeling: 'ajoelhado',
  incline: 'inclinado',
  decline: 'declinado',
  flat: 'reto',
  single: 'unilateral',
  double: 'bilateral',
  alternate: 'alternado',
  alternating: 'alternado',
  wide: 'aberto',
  narrow: 'fechado',
  close: 'fechado',
  overhand: 'pronada',
  underhand: 'supinada',
  reverse: 'invertido',
  neutral: 'neutra',
  grip: 'pegada',
  bent: 'curvado',
  bentover: 'curvado',
  'bent-over': 'curvado',
  front: 'frontal',
  rear: 'posterior',
  side: 'lateral',
  lateral: 'lateral',
  upright: 'ereto',
  overhead: 'acima da cabeça',
  behind: 'atrás',
  // partes do corpo
  chest: 'peito',
  back: 'costas',
  shoulder: 'ombro',
  shoulders: 'ombros',
  arm: 'braço',
  arms: 'braços',
  leg: 'perna',
  legs: 'pernas',
  hip: 'quadril',
  hips: 'quadril',
  knee: 'joelho',
  knees: 'joelhos',
  elbow: 'cotovelo',
  elbows: 'cotovelos',
  wrist: 'punho',
  ankle: 'tornozelo',
  foot: 'pé',
  feet: 'pés',
  hand: 'mão',
  hands: 'mãos',
  neck: 'pescoço',
  torso: 'tronco',
  core: 'core',
  spine: 'coluna',
  hamstring: 'posterior de coxa',
  glute: 'glúteo',
  glutes: 'glúteos',
  calf: 'panturrilha',
  calves: 'panturrilhas',
  quad: 'quadríceps',
  quads: 'quadríceps',
  ab: 'abdominal',
  abs: 'abdômen',
  oblique: 'oblíquo',
  obliques: 'oblíquos',
  lat: 'dorsal',
  lats: 'dorsais',
  trap: 'trapézio',
  traps: 'trapézio',
  delt: 'deltoide',
  delts: 'deltoides',
  bicep: 'bíceps',
  biceps: 'bíceps',
  tricep: 'tríceps',
  triceps: 'tríceps',
  forearm: 'antebraço',
  forearms: 'antebraços',
  // ajuda de leitura / conectores comuns em nomes
  and: 'e',
  with: 'com',
  on: 'em',
  in: 'em',
  the: 'o',
  a: 'um',
  to: 'para',
  from: 'de',
  of: 'de',
  your: 'seu',
  each: 'cada',
  both: 'ambos',
  one: 'um',
  two: 'dois',
  sit: 'sente-se',
  seat: 'banco',
  so: 'para que',
  aligned: 'alinhado',
  pivot: 'pivô',
  fully: 'totalmente',
  without: 'sem',
  letting: 'deixar',
  touch: 'tocar',
  avoid: 'evite',
  arching: 'arquear',
  during: 'durante',
  gripping: 'segurando',
  // termos que faltavam e ficavam sem tradução (ex.: "center", "other", "palms")
  adjust: 'ajuste',
  adjustable: 'ajustável',
  pulley: 'polia',
  pulleys: 'polias',
  center: 'centro',
  other: 'outro',
  palm: 'palma',
  palms: 'palmas',
  facing: 'voltado',
  extended: 'estendido',
  out: 'para fora',
  sides: 'lados',
  variation: 'variação',
  variations: 'variações',
  'cross-over': 'cruzado',
  width: 'largura',
  target: 'alvo',
  muscle: 'músculo',
  muscles: 'músculos',
}

function preserveCase(original: string, translated: string): string {
  if (original.toUpperCase() === original && original.length > 1) return translated.toUpperCase()
  if (original[0] === original[0]?.toUpperCase()) {
    return translated.charAt(0).toUpperCase() + translated.slice(1)
  }
  return translated
}

/** Traduz palavra a palavra usando o dicionário de vocabulário de exercícios, preservando pontuação e capitalização. */
function translateByTokens(text: string, extraDict?: Record<string, string>) {
  return text.replace(/[A-Za-zÀ-ÿ]+(?:['-][A-Za-zÀ-ÿ]+)*/g, (token) => {
    const key = token.toLowerCase()
    const found = extraDict?.[key] ?? EXERCISE_TERM_TRANSLATIONS[key] ?? MUSCLE_TRANSLATIONS[key]
    if (!found) return token
    return preserveCase(token, found)
  })
}

/**
 * Contrações preposição + artigo em PT-BR. A tradução por token nunca vai
 * "contrair" sozinha (produz "em o", "de a" etc.) — isso corrige o caso
 * mais comum e visível de português quebrado, aplicado como última etapa
 * em qualquer texto que passe pelos dicionários acima.
 */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bde o\b/gi, 'do'],
  [/\bde a\b/gi, 'da'],
  [/\bde os\b/gi, 'dos'],
  [/\bde as\b/gi, 'das'],
  [/\bem o\b/gi, 'no'],
  [/\bem a\b/gi, 'na'],
  [/\bem os\b/gi, 'nos'],
  [/\bem as\b/gi, 'nas'],
  [/\ba o\b/gi, 'ao'],
  [/\ba os\b/gi, 'aos'],
]

function fixContractions(text: string): string {
  let result = text
  for (const [pattern, replacement] of CONTRACTIONS) {
    result = result.replace(pattern, (match) => preserveCase(match, replacement))
  }
  return result
}

/** Traduz o nome de um exercício vindo da API (ex.: "barbell bench press" → "Barra Banco Supino"), com capitalização de título. */
export function translateExerciseName(name: string): string {
  const translated = translateByTokens(translatePhrases(name.trim()))
  return titleCase(fixContractions(translated).toLowerCase())
}

/**
 * Frases inteiras muito comuns nas instruções do exercisedb-api. Tradução
 * por frase evita os erros de ordem de palavras que a tradução por token
 * sozinha não resolve (ex.: "in front of the other" não vira "em frontal
 * de o other" — vira "na frente do outro" direto). Aplicadas ANTES da
 * tradução por token, da mais específica para a mais genérica.
 */
const PHRASE_TRANSLATIONS: [RegExp, string][] = [
  [/^grip the\b/gi, 'Segure a'],
  [/\bof the cable machine\b/gi, 'da máquina de polia'],
  [/\bthe cable pulleys\b/gi, 'as polias'],
  [/\bcable pulleys\b/gi, 'polias'],
  [/\bcable pulley\b/gi, 'polia'],
  [/\bcable machine\b/gi, 'máquina de polia'],
  [/\bto chest height\b/gi, 'na altura do peito'],
  [/\bchest height\b/gi, 'altura do peito'],
  [/\bthe handles\b/gi, 'as alças'],
  [/\bthe handle\b/gi, 'a alça'],
  [/\byour lower back\b/gi, 'sua lombar'],
  [/\blower back\b/gi, 'lombar'],
  [/\btoward each other\b/gi, 'em direção um ao outro'],
  [/\btowards each other\b/gi, 'em direção um ao outro'],
  [/\beach other\b/gi, 'um ao outro'],
  [/\bin front of the other\b/gi, 'na frente do outro'],
  [/\bin front of your chest\b/gi, 'à frente do peito'],
  [/\bin front of you\b/gi, 'à sua frente'],
  [/\bshoulder-width apart\b/gi, 'na largura dos ombros'],
  [/\bshoulder width apart\b/gi, 'na largura dos ombros'],
  [/\bhip-width apart\b/gi, 'na largura do quadril'],
  [/\bwith your palms facing down\b/gi, 'com as palmas voltadas para baixo'],
  [/\bwith your palms facing up\b/gi, 'com as palmas voltadas para cima'],
  [/\bpalms facing down\b/gi, 'palmas voltadas para baixo'],
  [/\bpalms facing up\b/gi, 'palmas voltadas para cima'],
  [/\bpalms facing each other\b/gi, 'palmas voltadas uma para a outra'],
  [/\bextended out to the sides\b/gi, 'estendidos para os lados'],
  [/\bout to the sides\b/gi, 'para os lados'],
  [/\bin the center of\b/gi, 'no centro de'],
  [/\breturn to the starting position\b/gi, 'retorne à posição inicial'],
  [/\breturn to starting position\b/gi, 'retorne à posição inicial'],
  [/\bback to the starting position\b/gi, 'de volta à posição inicial'],
  [/\bthe starting position\b/gi, 'a posição inicial'],
  [/\bin a controlled motion\b/gi, 'de forma controlada'],
  [/\bin a slow and controlled motion\b/gi, 'de forma lenta e controlada'],
  [/\bslowly lower\b/gi, 'abaixe lentamente'],
  [/\brepeat for the desired number of repetitions\b/gi, 'repita pelo número de repetições desejado'],
  [/\bfor the desired number of repetitions\b/gi, 'pelo número de repetições desejado'],
  [/\bkeep your back straight\b/gi, 'mantenha as costas retas'],
  [/\byour back straight\b/gi, 'as costas retas'],
  [/\bkeep your core engaged\b/gi, 'mantenha o core ativado'],
  [/\bthroughout the movement\b/gi, 'durante todo o movimento'],
  [/\btake a deep breath\b/gi, 'respire fundo'],
  [/\bone foot in front of the other\b/gi, 'um pé à frente do outro'],
]

function translatePhrases(text: string): string {
  let result = text
  for (const [pattern, replacement] of PHRASE_TRANSLATIONS) {
    result = result.replace(pattern, replacement)
  }
  return result
}

// Verbos e conectores extras, comuns em instruções passo a passo, que não
// fazem sentido no dicionário de "nome de exercício" mas ajudam a deixar
// as instruções mais legíveis em PT-BR.
const INSTRUCTION_EXTRA_TERMS: Record<string, string> = {
  begin: 'comece',
  start: 'comece',
  starting: 'inicial',
  position: 'posição',
  positioned: 'posicionado',
  place: 'posicione',
  placing: 'posicionando',
  grab: 'segure',
  grasp: 'segure',
  hold: 'segure',
  holding: 'segurando',
  keep: 'mantenha',
  keeping: 'mantendo',
  maintain: 'mantenha',
  lower: 'abaixe',
  lowering: 'abaixando',
  raise: 'levante',
  raising: 'levantando',
  lift: 'levante',
  lifting: 'levantando',
  push: 'empurre',
  pushing: 'empurrando',
  pull: 'puxe',
  pulling: 'puxando',
  extend: 'estenda',
  extending: 'estendendo',
  bend: 'flexione',
  bending: 'flexionando',
  straighten: 'estique',
  squeeze: 'contraia',
  squeezing: 'contraindo',
  engage: 'ative',
  brace: 'estabilize',
  return: 'retorne',
  returning: 'retornando',
  repeat: 'repita',
  perform: 'execute',
  performing: 'executando',
  slowly: 'lentamente',
  quickly: 'rapidamente',
  until: 'até',
  parallel: 'paralelo',
  floor: 'chão',
  ground: 'chão',
  apart: 'afastados',
  together: 'juntos',
  forward: 'para frente',
  backward: 'para trás',
  upward: 'para cima',
  downward: 'para baixo',
  up: 'para cima',
  down: 'para baixo',
  body: 'corpo',
  straight: 'reto',
  slight: 'leve',
  slightly: 'levemente',
  full: 'completa',
  range: 'amplitude',
  motion: 'movimento',
  repetition: 'repetição',
  repetitions: 'repetições',
  set: 'série',
  sets: 'séries',
  weight: 'peso',
  handle: 'alça',
  handles: 'alças',
  attachment: 'acessório',
  breathe: 'respire',
  exhale: 'expire',
  inhale: 'inspire',
  pause: 'pausa',
  then: 'depois',
  first: 'primeiro',
  next: 'em seguida',
  finally: 'por fim',
  slow: 'lento',
  controlled: 'controlado',
  control: 'controle',
  motionless: 'imóvel',
  stationary: 'parado',
  throughout: 'durante todo o',
  movement: 'movimento',
  entire: 'todo o',
  original: 'original',
  point: 'ponto',
  level: 'nível',
  height: 'altura',
  distance: 'distância',
  space: 'espaço',
  toward: 'em direção a',
  towards: 'em direção a',
  away: 'para longe',
  are: 'estão',
  is: 'está',
}

/**
 * Traduz uma instrução em texto livre: primeiro substitui frases inteiras
 * conhecidas (evita erro de ordem de palavras), depois traduz o que sobrou
 * palavra a palavra, corrige contrações preposição+artigo ("em o" → "no")
 * e garante que a frase comece com maiúscula. É uma tradução "melhor
 * esforço": termos fora dos dicionários permanecem em inglês em vez de
 * arriscar uma tradução errada.
 */
export function translateInstruction(step: string): string {
  const withPhrases = translatePhrases(step)
  const withTokens = translateByTokens(withPhrases, INSTRUCTION_EXTRA_TERMS)
  const fixed = fixContractions(withTokens).trim()
  return fixed.charAt(0).toUpperCase() + fixed.slice(1)
}
