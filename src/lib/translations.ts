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
  on: 'no',
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

/** Traduz o nome de um exercício vindo da API (ex.: "barbell bench press" → "Barra Banco Supino"), com capitalização de título. */
export function translateExerciseName(name: string): string {
  const translated = translateByTokens(name.trim())
  return titleCase(translated.toLowerCase())
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
}

/**
 * Traduz uma instrução em texto livre, palavra a palavra, usando os
 * dicionários de vocabulário de exercício + músculos + verbos de instrução.
 * É uma tradução "melhor esforço": termos fora dos dicionários permanecem
 * em inglês em vez de arriscar uma tradução incorreta.
 */
export function translateInstruction(step: string): string {
  return translateByTokens(step, INSTRUCTION_EXTRA_TERMS)
}
