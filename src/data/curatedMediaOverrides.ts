/**
 * curatedMediaOverrides.ts
 * ------------------------------------------------------------------------
 * A biblioteca curada (src/data/exercises.ts) tem texto explicativo
 * escrito à mão, mas nasceu sem foto real (usava um slug qualquer como
 * thumbnail, o que sempre caía no placeholder). Para 15 desses 46
 * exercícios, encontramos uma foto real equivalente no free-exercise-db
 * (por nome — ver transform_exercises.py) com confiança alta o
 * suficiente pra usar. Os outros 31 continuam no placeholder elegante
 * até termos uma correspondência confiável.
 *
 * Aplicado em src/data/exercises.ts: cada exercício curado cujo id
 * aparecer aqui tem thumbnail/media sobrescritos por essa foto real,
 * sem precisar editar à mão os 46 objetos.
 */
export const curatedMediaOverrides: Record<string, { photoStart: string; photoEnd: string }> = {
  'agachamento-livre': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/1.jpg' },
  'elevacao-lateral': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Raise/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Raise/1.jpg' },
  'remada-curvada-barra': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg' },
  'barra-fixa-assistida': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Assisted_Pull-Up/1.jpg' },
  'supino-inclinado-halteres': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg' },
  'desenvolvimento-militar-barra': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shoulder_Press/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shoulder_Press/1.jpg' },
  'elevacao-frontal': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/1.jpg' },
  'rosca-direta-barra': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/1.jpg' },
  'rosca-alternada-halteres': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Alternate_Bicep_Curl/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Alternate_Bicep_Curl/1.jpg' },
  'rosca-scott': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/1.jpg' },
  'leg-press': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg' },
  'levantamento-terra-romeno': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg' },
  'cadeira-flexora': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/1.jpg' },
  'agachamento-sumo': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plie_Dumbbell_Squat/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plie_Dumbbell_Squat/1.jpg' },
  'prancha-lateral': { photoStart: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/0.jpg', photoEnd: 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/1.jpg' },
}
