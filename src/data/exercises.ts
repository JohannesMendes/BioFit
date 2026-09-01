import type { Exercise } from '@/types'
import { generatedExercises } from '@/data/generatedExercises'
import { curatedMediaOverrides } from '@/data/curatedMediaOverrides'

const curatedExercises: Exercise[] = [
  {
    id: 'supino-reto-barra',
    name: 'Supino Reto com Barra',
    muscleGroups: ['peito', 'triceps', 'ombros'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'supino-reto-barra',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'peitoral-maior', role: 'alvo' },
      { pathId: 'triceps', role: 'sinergista' },
      { pathId: 'deltoide-anterior', role: 'sinergista' },
    ],
    media: { photoStart: 'supino-inicio', photoEnd: 'supino-final' },
    explanation: {
      simples:
        'Deitado no banco, você empurra a barra para cima até os braços ficarem quase esticados, sentindo o peito trabalhar para "abrir e fechar" o movimento. É o exercício clássico para ganhar força e volume no peitoral.',
      biomecanica: {
        articulacoes: 'Articulação glenoumeral (flexão horizontal do ombro) e cotovelo (extensão).',
        vetorForca: 'Força resultante perpendicular ao tronco, vetor ascendente ao longo do eixo da barra.',
        amplitude: 'Encurtamento do peitoral maior na fase concêntrica; alongamento controlado na fase excêntrica até a barra tocar levemente o esterno.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco reto', 'Barra olímpica', 'Anilhas', 'Suporte (rack)'],
      errosComuns: [
        'Arquear excessivamente a lombar tirando os glúteos do banco',
        'Descer a barra rápido demais sem controle',
        'Cotovelos totalmente abertos a 90°, sobrecarregando o ombro',
      ],
      substitutos: ['supino-halteres', 'crucifixo-maquina', 'flexao-bracos'],
    },
  },
  {
    id: 'supino-halteres',
    name: 'Supino Reto com Halteres',
    muscleGroups: ['peito', 'triceps', 'ombros'],
    equipment: 'Halter',
    environment: ['academia'],
    thumbnail: 'supino-halteres',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'peitoral-maior', role: 'alvo' },
      { pathId: 'triceps', role: 'sinergista' },
    ],
    media: { photoStart: 'halteres-inicio', photoEnd: 'halteres-final' },
    explanation: {
      simples:
        'Igual ao supino com barra, mas com um halter em cada mão. Isso permite descer mais e trabalhar cada lado do corpo de forma independente.',
      biomecanica: {
        articulacoes: 'Glenoumeral (flexão horizontal) e cotovelo (extensão), com maior liberdade rotacional do punho.',
        vetorForca: 'Dois vetores ascendentes independentes, exigindo maior estabilização escapular.',
        amplitude: 'Maior amplitude de movimento em relação à barra, permitindo alongamento adicional do peitoral.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco reto', 'Par de halteres'],
      errosComuns: [
        'Bater os halteres com força no topo do movimento',
        'Descer além do limite confortável do ombro',
      ],
      substitutos: ['supino-reto-barra', 'crucifixo-maquina'],
    },
  },
  {
    id: 'puxada-frente',
    name: 'Puxada Frente na Polia',
    muscleGroups: ['costas', 'biceps'],
    equipment: 'Polia',
    environment: ['academia'],
    thumbnail: 'puxada-frente',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'grande-dorsal', role: 'alvo' },
      { pathId: 'biceps', role: 'sinergista' },
    ],
    media: { photoStart: 'puxada-inicio', photoEnd: 'puxada-final' },
    explanation: {
      simples:
        'Sentado, você puxa a barra por cima da cabeça até a altura do peito, sentindo as costas "se fechando" atrás do corpo. Ótimo para quem ainda não consegue fazer barra fixa.',
      biomecanica: {
        articulacoes: 'Extensão e adução do ombro (glenoumeral), flexão de cotovelo.',
        vetorForca: 'Vetor de tração descendente, resistência aplicada via cabo e polia.',
        amplitude: 'Alongamento do grande dorsal com braços estendidos acima da cabeça até encurtamento completo próximo ao peito.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Estação de polia alta', 'Barra de puxada'],
      errosComuns: [
        'Usar embalo do tronco para puxar o peso',
        'Puxar a barra atrás do pescoço',
        'Não controlar a fase excêntrica (subida da barra)',
      ],
      substitutos: ['remada-curvada', 'barra-fixa-assistida'],
    },
  },
  {
    id: 'agachamento-livre',
    name: 'Agachamento Livre com Barra',
    muscleGroups: ['quadriceps', 'gluteos', 'lombar'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'agachamento-livre',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'quadriceps', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
      { pathId: 'eretores-espinha', role: 'sinergista' },
    ],
    media: { photoStart: 'agacho-inicio', photoEnd: 'agacho-final' },
    explanation: {
      simples:
        'Com a barra apoiada nas costas, você flexiona os joelhos e quadril como se fosse sentar em uma cadeira imaginária, depois volta à posição inicial. Trabalha o corpo inteiro, especialmente as pernas.',
      biomecanica: {
        articulacoes: 'Flexão de quadril, joelho e tornozelo simultaneamente (tríplice flexão), seguida de tríplice extensão.',
        vetorForca: 'Vetor de carga axial ao longo da coluna, exigindo estabilização do core.',
        amplitude: 'Amplitude completa idealmente até a crista ilíaca abaixo da linha do joelho (agachamento profundo).',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Rack de agachamento', 'Barra olímpica', 'Anilhas'],
      errosComuns: [
        'Joelhos colapsando para dentro (valgo dinâmico)',
        'Perder a curvatura neutra da lombar no fundo do movimento',
        'Calcanhares saindo do chão',
      ],
      substitutos: ['leg-press', 'agachamento-bulgaro'],
    },
  },
  {
    id: 'flexao-bracos',
    name: 'Flexão de Braços',
    muscleGroups: ['peito', 'triceps', 'abdomen'],
    equipment: 'Peso Corporal',
    environment: ['academia', 'casa'],
    thumbnail: 'flexao-bracos',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'peitoral-maior', role: 'alvo' },
      { pathId: 'triceps', role: 'sinergista' },
      { pathId: 'reto-abdominal', role: 'sinergista' },
    ],
    media: { photoStart: 'flexao-inicio', photoEnd: 'flexao-final' },
    explanation: {
      simples:
        'Apoiado nas mãos e nas pontas dos pés, você desce o corpo mantendo-o reto como uma prancha, até quase tocar o chão, e empurra de volta para cima.',
      biomecanica: {
        articulacoes: 'Flexão horizontal de ombro e extensão de cotovelo, com estabilização isométrica do core.',
        vetorForca: 'Resistência é o próprio peso corporal; vetor de força perpendicular ao solo.',
        amplitude: 'Descida até cerca de 90° de flexão de cotovelo, evitando toque brusco do tronco no chão.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Nenhum (ou tapete)'],
      errosComuns: [
        'Deixar o quadril cair (perda da linha reta)',
        'Amplitude incompleta',
        'Cotovelos totalmente perpendiculares ao tronco',
      ],
      substitutos: ['supino-halteres', 'flexao-joelhos'],
    },
  },
  {
    id: 'agachamento-livre-corporal',
    name: 'Agachamento com Peso Corporal',
    muscleGroups: ['quadriceps', 'gluteos'],
    equipment: 'Peso Corporal',
    environment: ['academia', 'casa'],
    thumbnail: 'agachamento-corporal',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'quadriceps', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
    ],
    media: { photoStart: 'agacho-corp-inicio', photoEnd: 'agacho-corp-final' },
    explanation: {
      simples:
        'Sem nenhum equipamento: flexione os joelhos e o quadril como se fosse sentar, mantendo o peito erguido, e volte a subir. Ótimo ponto de partida antes de usar cargas externas.',
      biomecanica: {
        articulacoes: 'Tríplice flexão de quadril, joelho e tornozelo seguida de tríplice extensão, sem carga axial adicional.',
        vetorForca: 'Vetor de força limitado ao peso corporal, deslocamento vertical do centro de massa.',
        amplitude: 'Amplitude completa e livre, ideal para treinar padrão de movimento antes de progressão com carga.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Nenhum'],
      errosComuns: [
        'Levantar os calcanhares do chão',
        'Inclinar o tronco excessivamente para frente',
      ],
      substitutos: ['agachamento-livre', 'agachamento-bulgaro'],
    },
  },
  {
    id: 'elevacao-lateral',
    name: 'Elevação Lateral com Halteres',
    muscleGroups: ['ombros'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'elevacao-lateral',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'deltoide-lateral', role: 'alvo' },
      { pathId: 'trapezio-superior', role: 'sinergista' },
    ],
    media: { photoStart: 'elevacao-inicio', photoEnd: 'elevacao-final' },
    explanation: {
      simples:
        'Com um halter em cada mão ao lado do corpo, eleve os braços para os lados até a altura dos ombros, como se fosse "abrir asas". Deixa os ombros mais largos e definidos.',
      biomecanica: {
        articulacoes: 'Abdução do ombro no plano frontal (articulação glenoumeral).',
        vetorForca: 'Torque resistivo aumenta progressivamente até os 90° de abdução, onde o braço de alavanca é máximo.',
        amplitude: 'Elevação até aproximadamente a linha dos ombros; ultrapassar esse ponto recruta mais o trapézio que o deltoide.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Par de halteres leves'],
      errosComuns: [
        'Usar impulso do tronco para "jogar" o peso para cima',
        'Elevar acima da linha dos ombros',
        'Girar os punhos para "despejar água" de forma exagerada',
      ],
      substitutos: ['elevacao-lateral-polia', 'desenvolvimento-ombros'],
    },
  },
  {
    id: 'prancha-abdominal',
    name: 'Prancha Abdominal',
    muscleGroups: ['abdomen', 'lombar'],
    equipment: 'Peso Corporal',
    environment: ['academia', 'casa'],
    thumbnail: 'prancha',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'reto-abdominal', role: 'alvo' },
      { pathId: 'transverso-abdominal', role: 'alvo' },
      { pathId: 'eretores-espinha', role: 'sinergista' },
    ],
    media: { photoStart: 'prancha-pose', photoEnd: 'prancha-pose' },
    explanation: {
      simples:
        'Apoiado nos antebraços e pontas dos pés, mantenha o corpo em linha reta, como uma tábua, contraindo o abdômen sem prender a respiração.',
      biomecanica: {
        articulacoes: 'Estabilização isométrica da coluna lombar e pelve, sem movimento articular significativo.',
        vetorForca: 'Resistência ao torque de extensão lombar gerado pela gravidade sobre o tronco.',
        amplitude: 'Movimento isométrico — o objetivo é ausência de deslocamento, especialmente da pelve (evitar anteversão).',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete (opcional)'],
      errosComuns: [
        'Deixar o quadril subir formando um "V" invertido',
        'Deixar o quadril cair, hiperestendendo a lombar',
        'Prender a respiração',
      ],
      substitutos: ['prancha-lateral', 'abdominal-bicicleta'],
    },
  },

  // ── COSTAS ────────────────────────────────────────────────────────────
  {
    id: 'remada-curvada-barra',
    name: 'Remada Curvada com Barra',
    muscleGroups: ['costas', 'biceps', 'lombar'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'remada-curvada',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'grande-dorsal', role: 'alvo' },
      { pathId: 'biceps', role: 'sinergista' },
      { pathId: 'eretores-espinha', role: 'sinergista' },
    ],
    media: { photoStart: 'remada-inicio', photoEnd: 'remada-final' },
    explanation: {
      simples:
        'Com o tronco inclinado à frente e a barra em mãos, você puxa o peso em direção ao abdômen, apertando as costas no topo do movimento.',
      biomecanica: {
        articulacoes: 'Extensão do ombro (glenoumeral) e flexão do cotovelo, com estabilização isométrica da coluna em flexão de quadril.',
        vetorForca: 'Vetor de tração horizontal, exige controle do tronco contra o torque de flexão gerado pela carga.',
        amplitude: 'Encurtamento do grande dorsal na fase concêntrica; controle total até a extensão quase completa do braço.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Barra olímpica', 'Anilhas'],
      errosComuns: ['Arredondar a lombar', 'Usar embalo do corpo para puxar', 'Elevar demais o tronco durante a puxada'],
      substitutos: ['remada-baixa-polia', 'puxada-frente'],
    },
  },
  {
    id: 'remada-baixa-polia',
    name: 'Remada Baixa na Polia',
    muscleGroups: ['costas', 'biceps'],
    equipment: 'Polia',
    environment: ['academia'],
    thumbnail: 'remada-baixa',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'grande-dorsal', role: 'alvo' },
      { pathId: 'biceps', role: 'sinergista' },
    ],
    media: { photoStart: 'remada-baixa-inicio', photoEnd: 'remada-baixa-final' },
    explanation: {
      simples:
        'Sentado de frente para a polia baixa, você puxa o triângulo (ou barra) em direção ao abdômen, mantendo o tronco ereto.',
      biomecanica: {
        articulacoes: 'Extensão de ombro e flexão de cotovelo, com retração escapular no final do movimento.',
        vetorForca: 'Vetor de tração horizontal constante mantido pelo cabo, resistência estável em toda a amplitude.',
        amplitude: 'Alongamento com braços estendidos à frente; encurtamento completo com cotovelos junto ao tronco.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Estação de polia baixa', 'Puxador triângulo'],
      errosComuns: ['Balançar o tronco para trás excessivamente', 'Elevar os ombros em direção às orelhas'],
      substitutos: ['remada-curvada-barra', 'puxada-frente'],
    },
  },
  {
    id: 'barra-fixa',
    name: 'Barra Fixa (Pull-up)',
    muscleGroups: ['costas', 'biceps'],
    equipment: 'Peso Corporal',
    environment: ['academia', 'casa'],
    thumbnail: 'barra-fixa',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'grande-dorsal', role: 'alvo' },
      { pathId: 'biceps', role: 'sinergista' },
    ],
    media: { photoStart: 'barra-fixa-inicio', photoEnd: 'barra-fixa-final' },
    explanation: {
      simples:
        'Pendurado em uma barra, você puxa o corpo para cima até o queixo passar da barra, usando principalmente a força das costas.',
      biomecanica: {
        articulacoes: 'Adução e extensão do ombro, flexão de cotovelo, com o corpo todo como resistência.',
        vetorForca: 'Vetor de tração vertical ascendente, resistência igual ao peso corporal total.',
        amplitude: 'Amplitude completa dos braços totalmente estendidos até o queixo acima da barra.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Barra fixa'],
      errosComuns: ['Balançar as pernas (kipping) sem controle', 'Amplitude incompleta', 'Ombros elevados no início do movimento'],
      substitutos: ['puxada-frente', 'barra-fixa-assistida'],
    },
  },
  {
    id: 'barra-fixa-assistida',
    name: 'Barra Fixa Assistida (Máquina)',
    muscleGroups: ['costas', 'biceps'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'barra-fixa-assistida',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'grande-dorsal', role: 'alvo' },
      { pathId: 'biceps', role: 'sinergista' },
    ],
    media: { photoStart: 'assistida-inicio', photoEnd: 'assistida-final' },
    explanation: {
      simples:
        'Igual à barra fixa, mas com um contrapeso na máquina que ajuda a "empurrar" você para cima — ótimo para quem ainda não tem força para a versão livre.',
      biomecanica: {
        articulacoes: 'Mesmo padrão de adução/extensão do ombro e flexão de cotovelo, com resistência reduzida por contrapeso.',
        vetorForca: 'Contrapeso subtrai parte do peso corporal do vetor resistivo, mantendo a mesma direção de movimento.',
        amplitude: 'Amplitude completa, geralmente mais controlada que a versão livre.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina de barra assistida'],
      errosComuns: ['Selecionar contrapeso alto demais e perder o estímulo', 'Apoiar todo o peso nos joelhos sem controle'],
      substitutos: ['puxada-frente', 'barra-fixa'],
    },
  },
  {
    id: 'crucifixo-maquina',
    name: 'Crucifixo na Máquina (Peck Deck)',
    muscleGroups: ['peito'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'crucifixo-maquina',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'peitoral-maior', role: 'alvo' }],
    media: { photoStart: 'peckdeck-inicio', photoEnd: 'peckdeck-final' },
    explanation: {
      simples:
        'Sentado na máquina, você junta os braços à frente do peito, como um abraço, sentindo o peitoral se contrair.',
      biomecanica: {
        articulacoes: 'Adução horizontal do ombro isolada, cotovelo fixo em leve flexão.',
        vetorForca: 'Resistência da máquina aplicada perpendicularmente ao antebraço em arco.',
        amplitude: 'Alongamento máximo com braços abertos; pico de contração com braços unidos à frente.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina peck deck / crucifixo'],
      errosComuns: ['Usar amplitude excessiva forçando o ombro para trás', 'Impulsionar com o tronco'],
      substitutos: ['crossover-polia', 'supino-halteres'],
    },
  },
  {
    id: 'crossover-polia',
    name: 'Crossover na Polia Alta',
    muscleGroups: ['peito'],
    equipment: 'Polia',
    environment: ['academia'],
    thumbnail: 'crossover',
    difficulty: 'intermediário',
    muscleHighlights: [{ pathId: 'peitoral-maior', role: 'alvo' }],
    media: { photoStart: 'crossover-inicio', photoEnd: 'crossover-final' },
    explanation: {
      simples:
        'Com um cabo em cada mão, vindos de cima, você traz os braços para baixo e para frente, cruzando à altura do quadril.',
      biomecanica: {
        articulacoes: 'Adução horizontal e depressão do ombro combinadas, cotovelo em leve flexão constante.',
        vetorForca: 'Resistência diagonal descendente aplicada pelo cabo, tensão constante ao longo de toda a amplitude.',
        amplitude: 'Alongamento amplo do peitoral no início; encurtamento total ao cruzar os cabos à frente do corpo.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Estação de polia dupla (cross)'],
      errosComuns: ['Perder a tensão no ponto de cruzamento', 'Flexionar demais o cotovelo transformando em outro movimento'],
      substitutos: ['crucifixo-maquina', 'supino-halteres'],
    },
  },
  {
    id: 'supino-inclinado-halteres',
    name: 'Supino Inclinado com Halteres',
    muscleGroups: ['peito', 'ombros', 'triceps'],
    equipment: 'Halter',
    environment: ['academia'],
    thumbnail: 'supino-inclinado',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'peitoral-maior', role: 'alvo' },
      { pathId: 'deltoide-anterior', role: 'sinergista' },
      { pathId: 'triceps', role: 'sinergista' },
    ],
    media: { photoStart: 'inclinado-inicio', photoEnd: 'inclinado-final' },
    explanation: {
      simples:
        'Igual ao supino comum, mas no banco inclinado — isso desloca parte do esforço para a "parte de cima" do peito.',
      biomecanica: {
        articulacoes: 'Flexão do ombro em ângulo de aproximadamente 30-45°, extensão de cotovelo.',
        vetorForca: 'Vetor de empurrão ascendente-diagonal, alterado pela inclinação do banco em relação ao supino reto.',
        amplitude: 'Maior recrutamento da porção clavicular do peitoral maior comparado ao supino reto.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco inclinável', 'Par de halteres'],
      errosComuns: ['Inclinar o banco além de 45°, transformando em exercício de ombro', 'Descer os halteres rápido demais'],
      substitutos: ['supino-reto-barra', 'crossover-polia'],
    },
  },

  // ── OMBROS ────────────────────────────────────────────────────────────
  {
    id: 'desenvolvimento-halteres',
    name: 'Desenvolvimento com Halteres',
    muscleGroups: ['ombros', 'triceps'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'desenvolvimento-halteres',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'deltoide-anterior', role: 'alvo' },
      { pathId: 'triceps', role: 'sinergista' },
    ],
    media: { photoStart: 'desenvolvimento-inicio', photoEnd: 'desenvolvimento-final' },
    explanation: {
      simples:
        'Sentado ou em pé, você empurra os halteres para cima da cabeça até quase esticar os braços, e desce controlado até a altura dos ombros.',
      biomecanica: {
        articulacoes: 'Flexão e leve abdução do ombro, extensão de cotovelo, com estabilização escapular constante.',
        vetorForca: 'Vetor de empurrão vertical ascendente ao longo do eixo do braço.',
        amplitude: 'Da posição de halteres na altura dos ombros até quase a extensão completa acima da cabeça.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Par de halteres', 'Banco (opcional, com encosto)'],
      errosComuns: ['Arquear excessivamente a lombar', 'Bater os halteres com força no topo'],
      substitutos: ['desenvolvimento-militar-barra', 'elevacao-lateral'],
    },
  },
  {
    id: 'desenvolvimento-militar-barra',
    name: 'Desenvolvimento Militar com Barra',
    muscleGroups: ['ombros', 'triceps'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'militar-barra',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'deltoide-anterior', role: 'alvo' },
      { pathId: 'triceps', role: 'sinergista' },
    ],
    media: { photoStart: 'militar-inicio', photoEnd: 'militar-final' },
    explanation: {
      simples:
        'Em pé, com a barra na altura dos ombros, você empurra para cima até os braços ficarem estendidos, mantendo o corpo estável como uma prancha.',
      biomecanica: {
        articulacoes: 'Flexão do ombro com extensão de cotovelo, e forte estabilização isométrica do core e lombar.',
        vetorForca: 'Vetor ascendente com exigência extra de equilíbrio comparado à versão sentada.',
        amplitude: 'Da barra na altura da clavícula até os braços quase totalmente estendidos acima da cabeça.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Barra olímpica', 'Anilhas'],
      errosComuns: ['Hiperextender a lombar para compensar', 'Não travar o core antes de empurrar'],
      substitutos: ['desenvolvimento-halteres', 'elevacao-lateral'],
    },
  },
  {
    id: 'elevacao-frontal',
    name: 'Elevação Frontal com Halteres',
    muscleGroups: ['ombros'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'elevacao-frontal',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'deltoide-anterior', role: 'alvo' }],
    media: { photoStart: 'frontal-inicio', photoEnd: 'frontal-final' },
    explanation: {
      simples:
        'Com um halter em cada mão à frente do corpo, você eleva os braços para frente até a altura dos ombros, um de cada vez ou juntos.',
      biomecanica: {
        articulacoes: 'Flexão do ombro no plano sagital.',
        vetorForca: 'Torque resistivo cresce até os 90° de flexão, onde o braço de alavanca é máximo.',
        amplitude: 'Do quadril até a altura dos ombros, evitando ultrapassar muito esse ponto.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Par de halteres leves'],
      errosComuns: ['Usar impulso do quadril', 'Elevar acima da linha dos ombros repetidamente'],
      substitutos: ['elevacao-lateral', 'desenvolvimento-halteres'],
    },
  },
  {
    id: 'remada-alta-elastico',
    name: 'Remada Alta com Elástico',
    muscleGroups: ['ombros', 'costas'],
    equipment: 'Elástico',
    environment: ['casa', 'academia'],
    thumbnail: 'remada-alta-elastico',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'deltoide-anterior', role: 'sinergista' },
      { pathId: 'trapezio-superior', role: 'alvo' },
    ],
    media: { photoStart: 'elastico-inicio', photoEnd: 'elastico-final' },
    explanation: {
      simples:
        'Pisando no elástico, você puxa as pontas para cima até a altura do peito, levando os cotovelos para os lados — ótimo pra treinar em casa sem halteres.',
      biomecanica: {
        articulacoes: 'Abdução do ombro combinada com elevação da escápula.',
        vetorForca: 'Resistência elástica cresce progressivamente conforme o estiramento aumenta.',
        amplitude: 'Do quadril até os cotovelos na altura dos ombros.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Faixa elástica de resistência'],
      errosComuns: ['Elevar os ombros junto com os cotovelos', 'Perder a postura ereta durante a puxada'],
      substitutos: ['elevacao-lateral', 'desenvolvimento-halteres'],
    },
  },

  // ── BÍCEPS ────────────────────────────────────────────────────────────
  {
    id: 'rosca-direta-barra',
    name: 'Rosca Direta com Barra',
    muscleGroups: ['biceps'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'rosca-direta',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'biceps', role: 'alvo' }],
    media: { photoStart: 'rosca-inicio', photoEnd: 'rosca-final' },
    explanation: {
      simples:
        'Em pé, segurando a barra com as mãos viradas para cima, você flexiona os cotovelos trazendo a barra até perto do peito.',
      biomecanica: {
        articulacoes: 'Flexão do cotovelo com supinação do antebraço mantida.',
        vetorForca: 'Vetor de resistência vertical constante (gravidade), maior torque na posição intermediária do movimento.',
        amplitude: 'Do braço totalmente estendido até a flexão máxima do cotovelo.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Barra reta ou W', 'Anilhas'],
      errosComuns: ['Balançar o tronco para ajudar (embalo)', 'Não estender totalmente o braço na descida'],
      substitutos: ['rosca-alternada-halteres', 'rosca-scott'],
    },
  },
  {
    id: 'rosca-alternada-halteres',
    name: 'Rosca Alternada com Halteres',
    muscleGroups: ['biceps'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'rosca-alternada',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'biceps', role: 'alvo' }],
    media: { photoStart: 'alternada-inicio', photoEnd: 'alternada-final' },
    explanation: {
      simples:
        'Com um halter em cada mão ao lado do corpo, você flexiona um braço de cada vez, girando o punho para fora conforme sobe.',
      biomecanica: {
        articulacoes: 'Flexão do cotovelo combinada com supinação progressiva do antebraço.',
        vetorForca: 'Resistência gravitacional vertical, independente para cada braço.',
        amplitude: 'Rotação completa do punho de neutro para supinado durante a subida.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Par de halteres'],
      errosComuns: ['Mover o ombro para frente durante a flexão', 'Descer o halter rápido demais'],
      substitutos: ['rosca-direta-barra', 'rosca-scott'],
    },
  },
  {
    id: 'rosca-scott',
    name: 'Rosca Scott (Banco Scott)',
    muscleGroups: ['biceps'],
    equipment: 'Banco',
    environment: ['academia'],
    thumbnail: 'rosca-scott',
    difficulty: 'intermediário',
    muscleHighlights: [{ pathId: 'biceps', role: 'alvo' }],
    media: { photoStart: 'scott-inicio', photoEnd: 'scott-final' },
    explanation: {
      simples:
        'Com o braço apoiado no banco inclinado do Scott, você flexiona o cotovelo isolando o bíceps sem poder usar o corpo para ajudar.',
      biomecanica: {
        articulacoes: 'Flexão de cotovelo isolada, ombro fixo em leve flexão apoiado no banco.',
        vetorForca: 'O apoio elimina compensação do ombro, isolando o torque de flexão no cotovelo.',
        amplitude: 'Alongamento acentuado do bíceps na posição inicial devido ao ângulo do banco.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco Scott', 'Barra W ou halteres'],
      errosComuns: ['Não estender totalmente o cotovelo no fundo', 'Elevar o ombro do apoio durante o esforço'],
      substitutos: ['rosca-direta-barra', 'rosca-alternada-halteres'],
    },
  },
  {
    id: 'rosca-martelo',
    name: 'Rosca Martelo com Halteres',
    muscleGroups: ['biceps'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'rosca-martelo',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'biceps', role: 'alvo' }],
    media: { photoStart: 'martelo-inicio', photoEnd: 'martelo-final' },
    explanation: {
      simples:
        'Igual à rosca alternada, mas o punho fica sempre virado para dentro (como segurando um martelo), o que muda um pouco o músculo enfatizado.',
      biomecanica: {
        articulacoes: 'Flexão de cotovelo com antebraço em posição neutra (nem supinado nem pronado).',
        vetorForca: 'Resistência vertical, com maior participação do braquiorradial em relação à rosca supinada.',
        amplitude: 'Do braço estendido até a flexão máxima, sem rotação do punho.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Par de halteres'],
      errosComuns: ['Balançar o cotovelo para frente e para trás', 'Usar impulso do ombro'],
      substitutos: ['rosca-alternada-halteres', 'rosca-direta-barra'],
    },
  },

  // ── TRÍCEPS ───────────────────────────────────────────────────────────
  {
    id: 'triceps-corda-polia',
    name: 'Tríceps na Polia com Corda',
    muscleGroups: ['triceps'],
    equipment: 'Polia',
    environment: ['academia'],
    thumbnail: 'triceps-corda',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'triceps', role: 'alvo' }],
    media: { photoStart: 'corda-inicio', photoEnd: 'corda-final' },
    explanation: {
      simples:
        'De frente para a polia alta, segurando a corda, você estende os cotovelos empurrando para baixo, separando as pontas da corda no final.',
      biomecanica: {
        articulacoes: 'Extensão de cotovelo isolada, ombro fixo ao lado do corpo.',
        vetorForca: 'Resistência do cabo aplicada em vetor descendente constante.',
        amplitude: 'Do cotovelo flexionado a 90° até a extensão completa do braço.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Estação de polia alta', 'Corda'],
      errosComuns: ['Mover o cotovelo para frente durante a extensão', 'Usar o peso do corpo para empurrar'],
      substitutos: ['triceps-frances', 'mergulho-banco'],
    },
  },
  {
    id: 'triceps-frances',
    name: 'Tríceps Francês com Halter',
    muscleGroups: ['triceps'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'triceps-frances',
    difficulty: 'intermediário',
    muscleHighlights: [{ pathId: 'triceps', role: 'alvo' }],
    media: { photoStart: 'frances-inicio', photoEnd: 'frances-final' },
    explanation: {
      simples:
        'Sentado ou em pé, com um halter segurado com as duas mãos atrás da cabeça, você estende os cotovelos para cima.',
      biomecanica: {
        articulacoes: 'Extensão de cotovelo com o ombro fixo em flexão total (braço apontando para cima).',
        vetorForca: 'Vetor de resistência vertical, com o braço de alavanca máximo próximo à posição inicial (cotovelo flexionado).',
        amplitude: 'Alongamento acentuado do tríceps atrás da cabeça até a extensão completa acima dela.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Um halter'],
      errosComuns: ['Abrir os cotovelos para os lados', 'Descer o peso rápido demais atrás da cabeça'],
      substitutos: ['triceps-corda-polia', 'mergulho-banco'],
    },
  },
  {
    id: 'mergulho-banco',
    name: 'Mergulho no Banco (Tríceps)',
    muscleGroups: ['triceps', 'ombros'],
    equipment: 'Banco',
    environment: ['academia', 'casa'],
    thumbnail: 'mergulho-banco',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'triceps', role: 'alvo' },
      { pathId: 'deltoide-anterior', role: 'sinergista' },
    ],
    media: { photoStart: 'mergulho-inicio', photoEnd: 'mergulho-final' },
    explanation: {
      simples:
        'Apoiado de costas para o banco com as mãos na borda, você desce o corpo flexionando os cotovelos e depois empurra de volta para cima.',
      biomecanica: {
        articulacoes: 'Extensão de cotovelo com o corpo como resistência, leve flexão de ombro na descida.',
        vetorForca: 'Resistência é parte do peso corporal, vetor de força perpendicular ao chão.',
        amplitude: 'Descida até cerca de 90° de flexão de cotovelo, evitando sobrecarregar o ombro.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco firme ou cadeira estável'],
      errosComuns: ['Descer além de 90° de flexão de cotovelo', 'Afastar os pés muito, aumentando a carga sobre o ombro'],
      substitutos: ['triceps-corda-polia', 'triceps-frances'],
    },
  },

  // ── QUADRÍCEPS / PERNA ───────────────────────────────────────────────
  {
    id: 'leg-press',
    name: 'Leg Press 45°',
    muscleGroups: ['quadriceps', 'gluteos'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'leg-press',
    difficulty: 'iniciante',
    muscleHighlights: [
      { pathId: 'quadriceps', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
    ],
    media: { photoStart: 'legpress-inicio', photoEnd: 'legpress-final' },
    explanation: {
      simples:
        'Sentado e reclinado na máquina, você empurra a plataforma com os pés, estendendo os joelhos, e volta controlado.',
      biomecanica: {
        articulacoes: 'Extensão de joelho e quadril simultâneas contra resistência guiada pelo trilho da máquina.',
        vetorForca: 'Vetor de empurrão ao longo do trilho inclinado a 45°, sem exigir estabilização axial da coluna.',
        amplitude: 'Flexão de joelho até aproximadamente 90° na descida, extensão quase completa (sem travar) na subida.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina de leg press 45°'],
      errosComuns: ['Travar os joelhos totalmente no topo', 'Descer demais tirando o quadril do encosto'],
      substitutos: ['agachamento-livre', 'agachamento-bulgaro'],
    },
  },
  {
    id: 'agachamento-bulgaro',
    name: 'Agachamento Búlgaro',
    muscleGroups: ['quadriceps', 'gluteos'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'bulgaro',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'quadriceps', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
    ],
    media: { photoStart: 'bulgaro-inicio', photoEnd: 'bulgaro-final' },
    explanation: {
      simples:
        'Com um pé apoiado atrás em um banco, você agacha na perna da frente até quase tocar o joelho de trás no chão, depois sobe.',
      biomecanica: {
        articulacoes: 'Flexão unilateral de quadril e joelho, com forte demanda de estabilização do tornozelo e quadril.',
        vetorForca: 'Vetor de carga concentrado em uma única perna, exigindo maior controle de equilíbrio.',
        amplitude: 'Descida até o joelho de trás quase tocar o chão, subida até quase a extensão completa da perna da frente.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco', 'Par de halteres (opcional)'],
      errosComuns: ['Perder o equilíbrio lateral', 'Deixar o joelho da frente ultrapassar muito a ponta do pé de forma descontrolada'],
      substitutos: ['agachamento-livre', 'leg-press'],
    },
  },
  {
    id: 'cadeira-extensora',
    name: 'Cadeira Extensora',
    muscleGroups: ['quadriceps'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'extensora',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'quadriceps', role: 'alvo' }],
    media: { photoStart: 'extensora-inicio', photoEnd: 'extensora-final' },
    explanation: {
      simples:
        'Sentado na máquina, você estende os joelhos levantando o peso com a parte da frente da coxa, isolando o quadríceps.',
      biomecanica: {
        articulacoes: 'Extensão de joelho isolada, quadril fixo em flexão de 90°.',
        vetorForca: 'Resistência aplicada perpendicularmente à canela através do rolo acolchoado.',
        amplitude: 'De aproximadamente 90° de flexão de joelho até a extensão quase completa.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina cadeira extensora'],
      errosComuns: ['Travar o joelho com força no topo', 'Levantar o quadril do banco durante o esforço'],
      substitutos: ['leg-press', 'agachamento-livre-corporal'],
    },
  },

  // ── POSTERIOR DE COXA ─────────────────────────────────────────────────
  {
    id: 'levantamento-terra-romeno',
    name: 'Levantamento Terra Romeno',
    muscleGroups: ['posterior', 'gluteos', 'lombar'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'terra-romeno',
    difficulty: 'avançado',
    muscleHighlights: [
      { pathId: 'isquiotibiais', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
      { pathId: 'eretores-espinha', role: 'sinergista' },
    ],
    media: { photoStart: 'terra-inicio', photoEnd: 'terra-final' },
    explanation: {
      simples:
        'Com a barra nas mãos, você inclina o tronco para frente empurrando o quadril para trás, mantendo os joelhos quase estendidos, até sentir alongar atrás da coxa.',
      biomecanica: {
        articulacoes: 'Flexão de quadril predominante (dobradiça de quadril / hip hinge), joelhos em leve flexão fixa.',
        vetorForca: 'Vetor de carga vertical alinhado próximo ao corpo, gerando torque de flexão de quadril compensado pelos isquiotibiais e eretores.',
        amplitude: 'Alongamento máximo dos isquiotibiais no ponto mais baixo, sem perder a curvatura neutra da coluna.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Barra olímpica', 'Anilhas'],
      errosComuns: ['Arredondar a lombar durante a descida', 'Flexionar demais os joelhos, transformando em agachamento'],
      substitutos: ['mesa-flexora', 'cadeira-flexora'],
    },
  },
  {
    id: 'mesa-flexora',
    name: 'Mesa Flexora',
    muscleGroups: ['posterior'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'mesa-flexora',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'isquiotibiais', role: 'alvo' }],
    media: { photoStart: 'mesaflexora-inicio', photoEnd: 'mesaflexora-final' },
    explanation: {
      simples:
        'Deitado de bruços na máquina, você flexiona os joelhos trazendo o calcanhar em direção ao glúteo, isolando a parte de trás da coxa.',
      biomecanica: {
        articulacoes: 'Flexão de joelho isolada, quadril fixo em extensão neutra apoiado na mesa.',
        vetorForca: 'Resistência aplicada perpendicularmente à parte posterior da canela.',
        amplitude: 'Da perna estendida até a flexão máxima confortável do joelho.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina mesa flexora'],
      errosComuns: ['Elevar o quadril da mesa durante o esforço', 'Usar embalo ao invés de controle'],
      substitutos: ['levantamento-terra-romeno', 'cadeira-flexora'],
    },
  },
  {
    id: 'cadeira-flexora',
    name: 'Cadeira Flexora',
    muscleGroups: ['posterior'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'cadeira-flexora',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'isquiotibiais', role: 'alvo' }],
    media: { photoStart: 'cadeiraflex-inicio', photoEnd: 'cadeiraflex-final' },
    explanation: {
      simples:
        'Sentado na máquina, você puxa os calcanhares para baixo e para trás, flexionando os joelhos contra a resistência.',
      biomecanica: {
        articulacoes: 'Flexão de joelho isolada, quadril fixo em flexão de aproximadamente 90°.',
        vetorForca: 'Resistência aplicada na parte posterior do tornozelo/canela em arco descendente.',
        amplitude: 'Da perna estendida à frente até a flexão máxima do joelho.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina cadeira flexora'],
      errosComuns: ['Levantar o quadril do assento', 'Soltar o peso rápido demais na volta'],
      substitutos: ['mesa-flexora', 'levantamento-terra-romeno'],
    },
  },

  // ── GLÚTEOS ───────────────────────────────────────────────────────────
  {
    id: 'elevacao-pelvica',
    name: 'Elevação Pélvica (Hip Thrust)',
    muscleGroups: ['gluteos', 'posterior'],
    equipment: 'Barra',
    environment: ['academia'],
    thumbnail: 'hip-thrust',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'gluteo-maximo', role: 'alvo' },
      { pathId: 'isquiotibiais', role: 'sinergista' },
    ],
    media: { photoStart: 'hipthrust-inicio', photoEnd: 'hipthrust-final' },
    explanation: {
      simples:
        'Com as costas apoiadas em um banco e a barra sobre o quadril, você empurra o quadril para cima até o corpo formar uma linha reta, apertando o glúteo no topo.',
      biomecanica: {
        articulacoes: 'Extensão de quadril isolada, joelhos fixos em flexão de aproximadamente 90°.',
        vetorForca: 'Vetor de carga vertical sobre a pelve, com braço de alavanca favorável ao glúteo máximo.',
        amplitude: 'Do quadril flexionado próximo ao chão até a extensão completa com pico de contração glútea.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco', 'Barra olímpica', 'Almofada de proteção'],
      errosComuns: ['Hiperestender a lombar no topo em vez de usar o glúteo', 'Apoiar a barra em posição desconfortável sem almofada'],
      substitutos: ['agachamento-livre', 'cadeira-abdutora'],
    },
  },
  {
    id: 'cadeira-abdutora',
    name: 'Cadeira Abdutora',
    muscleGroups: ['gluteos'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'abdutora',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'gluteo-maximo', role: 'alvo' }],
    media: { photoStart: 'abdutora-inicio', photoEnd: 'abdutora-final' },
    explanation: {
      simples:
        'Sentado na máquina com as pernas nos apoios, você abre as pernas contra a resistência, sentindo o lado do quadril e o glúteo trabalhar.',
      biomecanica: {
        articulacoes: 'Abdução do quadril isolada.',
        vetorForca: 'Resistência aplicada lateralmente na coxa através do apoio acolchoado.',
        amplitude: 'Das pernas unidas até a abertura máxima confortável.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina cadeira abdutora'],
      errosComuns: ['Usar embalo para abrir as pernas', 'Amplitude excessiva forçando o quadril'],
      substitutos: ['elevacao-pelvica', 'agachamento-sumô'],
    },
  },
  {
    id: 'agachamento-sumo',
    name: 'Agachamento Sumô com Halter',
    muscleGroups: ['gluteos', 'quadriceps'],
    equipment: 'Halter',
    environment: ['academia', 'casa'],
    thumbnail: 'agachamento-sumo',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'gluteo-maximo', role: 'alvo' },
      { pathId: 'quadriceps', role: 'sinergista' },
    ],
    media: { photoStart: 'sumo-inicio', photoEnd: 'sumo-final' },
    explanation: {
      simples:
        'Com os pés bem afastados e as pontas viradas para fora, você segura um halter com as duas mãos e agacha entre as pernas, focando mais no glúteo e na parte interna da coxa.',
      biomecanica: {
        articulacoes: 'Flexão de quadril e joelho com maior rotação externa do quadril em relação ao agachamento tradicional.',
        vetorForca: 'Vetor de carga axial com trajetória mais vertical devido à base ampla.',
        amplitude: 'Amplitude completa até o quadril na altura ou abaixo dos joelhos.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Um halter ou kettlebell'],
      errosComuns: ['Joelhos colapsando para dentro', 'Tronco inclinando demais para frente'],
      substitutos: ['agachamento-livre-corporal', 'elevacao-pelvica'],
    },
  },

  // ── PANTURRILHA ───────────────────────────────────────────────────────
  {
    id: 'panturrilha-em-pe',
    name: 'Panturrilha em Pé (Máquina)',
    muscleGroups: ['panturrilha'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'panturrilha-pe',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'gastrocnemio', role: 'alvo' }],
    media: { photoStart: 'panturrilhape-inicio', photoEnd: 'panturrilhape-final' },
    explanation: {
      simples:
        'Em pé na máquina, com os ombros apoiados, você fica na ponta dos pés e desce controlado, sentindo a panturrilha trabalhar.',
      biomecanica: {
        articulacoes: 'Flexão plantar do tornozelo, joelho estendido para maximizar o recrutamento do gastrocnêmio.',
        vetorForca: 'Resistência vertical sobre os ombros, vetor de força ao longo do eixo da perna.',
        amplitude: 'Do calcanhar abaixo do nível dos dedos (alongamento) até a ponta máxima dos pés (contração).',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina de panturrilha em pé'],
      errosComuns: ['Fazer o movimento rápido demais sem controle', 'Amplitude curta, sem descer até o alongamento'],
      substitutos: ['panturrilha-sentado', 'panturrilha-peso-corporal'],
    },
  },
  {
    id: 'panturrilha-sentado',
    name: 'Panturrilha Sentado',
    muscleGroups: ['panturrilha'],
    equipment: 'Máquina',
    environment: ['academia'],
    thumbnail: 'panturrilha-sentado',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'gastrocnemio', role: 'alvo' }],
    media: { photoStart: 'panturrilhasent-inicio', photoEnd: 'panturrilhasent-final' },
    explanation: {
      simples:
        'Sentado, com o peso apoiado sobre os joelhos, você eleva os calcanhares repetidamente. Com o joelho flexionado, o enfoque muda para um músculo mais profundo da panturrilha (sóleo).',
      biomecanica: {
        articulacoes: 'Flexão plantar do tornozelo com joelho flexionado a 90°, reduzindo a participação do gastrocnêmio biarticular.',
        vetorForca: 'Resistência vertical aplicada sobre os joelhos.',
        amplitude: 'Amplitude completa de flexão plantar, do alongamento até a ponta dos pés.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Máquina de panturrilha sentado'],
      errosComuns: ['Amplitude incompleta', 'Movimento rápido sem pausa na contração'],
      substitutos: ['panturrilha-em-pe', 'panturrilha-peso-corporal'],
    },
  },
  {
    id: 'panturrilha-peso-corporal',
    name: 'Elevação de Panturrilha (Peso Corporal)',
    muscleGroups: ['panturrilha'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'panturrilha-corporal',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'gastrocnemio', role: 'alvo' }],
    media: { photoStart: 'panturrilhacorp-inicio', photoEnd: 'panturrilhacorp-final' },
    explanation: {
      simples:
        'Em pé, sem nenhum equipamento, apoiado em uma parede ou cadeira para equilíbrio, você fica na ponta dos pés e desce devagar.',
      biomecanica: {
        articulacoes: 'Flexão plantar do tornozelo contra o peso corporal.',
        vetorForca: 'Resistência limitada ao peso corporal, ideal para volume alto de repetições.',
        amplitude: 'Do calcanhar tocando o chão até a ponta máxima dos pés.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Nenhum (apoio de parede opcional)'],
      errosComuns: ['Fazer rápido demais perdendo o controle excêntrico', 'Não descer até sentir o alongamento'],
      substitutos: ['panturrilha-em-pe', 'panturrilha-sentado'],
    },
  },

  // ── ABDÔMEN / LOMBAR ─────────────────────────────────────────────────
  {
    id: 'abdominal-supra',
    name: 'Abdominal Supra (Crunch)',
    muscleGroups: ['abdomen'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'crunch',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'reto-abdominal', role: 'alvo' }],
    media: { photoStart: 'crunch-inicio', photoEnd: 'crunch-final' },
    explanation: {
      simples:
        'Deitado de costas com os joelhos dobrados, você eleva os ombros do chão contraindo a barriga, sem puxar o pescoço com as mãos.',
      biomecanica: {
        articulacoes: 'Flexão da coluna torácica e lombar superior.',
        vetorForca: 'Resistência é o peso do tronco superior contra a gravidade.',
        amplitude: 'Curta — apenas os ombros saem do chão, sem sentar completamente.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete (opcional)'],
      errosComuns: ['Puxar o pescoço com as mãos', 'Usar embalo em vez de contração controlada'],
      substitutos: ['prancha-abdominal', 'abdominal-bicicleta'],
    },
  },
  {
    id: 'abdominal-bicicleta',
    name: 'Abdominal Bicicleta',
    muscleGroups: ['abdomen'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'bicicleta',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'reto-abdominal', role: 'alvo' },
      { pathId: 'transverso-abdominal', role: 'sinergista' },
    ],
    media: { photoStart: 'bicicleta-inicio', photoEnd: 'bicicleta-final' },
    explanation: {
      simples:
        'Deitado, você alterna levando o cotovelo até o joelho oposto, como se estivesse pedalando, trabalhando o abdômen de forma rotacional.',
      biomecanica: {
        articulacoes: 'Flexão e rotação combinadas do tronco, com flexão alternada de quadril.',
        vetorForca: 'Resistência do próprio peso dos membros em movimento rotacional.',
        amplitude: 'Rotação completa do tronco a cada repetição, alternando os lados.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Nenhum'],
      errosComuns: ['Puxar o pescoço com as mãos', 'Fazer o movimento rápido demais sem controle'],
      substitutos: ['abdominal-supra', 'prancha-abdominal'],
    },
  },
  {
    id: 'prancha-lateral',
    name: 'Prancha Lateral',
    muscleGroups: ['abdomen', 'lombar'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'prancha-lateral',
    difficulty: 'intermediário',
    muscleHighlights: [{ pathId: 'transverso-abdominal', role: 'alvo' }],
    media: { photoStart: 'pranchalateral-pose', photoEnd: 'pranchalateral-pose' },
    explanation: {
      simples:
        'Apoiado de lado sobre o antebraço e a lateral do pé, você mantém o corpo em linha reta, trabalhando a lateral do abdômen.',
      biomecanica: {
        articulacoes: 'Estabilização isométrica lateral da coluna (resistência à flexão lateral).',
        vetorForca: 'Resistência ao torque de flexão lateral gerado pela gravidade sobre o tronco.',
        amplitude: 'Isométrico — sem movimento articular, foco em manter a linha reta do corpo.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete (opcional)'],
      errosComuns: ['Deixar o quadril cair', 'Girar o tronco para frente ou para trás'],
      substitutos: ['prancha-abdominal', 'abdominal-bicicleta'],
    },
  },
  {
    id: 'hiperextensao-lombar',
    name: 'Hiperextensão Lombar (Banco Romano)',
    muscleGroups: ['lombar', 'gluteos'],
    equipment: 'Banco',
    environment: ['academia'],
    thumbnail: 'hiperextensao',
    difficulty: 'intermediário',
    muscleHighlights: [
      { pathId: 'eretores-espinha', role: 'alvo' },
      { pathId: 'gluteo-maximo', role: 'sinergista' },
    ],
    media: { photoStart: 'hiperext-inicio', photoEnd: 'hiperext-final' },
    explanation: {
      simples:
        'Deitado de bruços no banco romano com o quadril apoiado, você desce o tronco controlado e sobe até formar uma linha reta com as pernas.',
      biomecanica: {
        articulacoes: 'Extensão da coluna lombar e do quadril combinadas.',
        vetorForca: 'Resistência é o peso do tronco superior, vetor de flexão gerado pela gravidade a ser controlado.',
        amplitude: 'Da flexão total do tronco até a linha reta com o corpo, sem hiperestender além disso.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Banco romano / hiperextensão'],
      errosComuns: ['Hiperestender além da linha reta', 'Fazer o movimento rápido usando embalo'],
      substitutos: ['prancha-abdominal', 'superman'],
    },
  },
  {
    id: 'superman',
    name: 'Superman (Extensão de Tronco no Chão)',
    muscleGroups: ['lombar', 'gluteos'],
    equipment: 'Peso Corporal',
    environment: ['casa'],
    thumbnail: 'superman',
    difficulty: 'iniciante',
    muscleHighlights: [{ pathId: 'eretores-espinha', role: 'alvo' }],
    media: { photoStart: 'superman-inicio', photoEnd: 'superman-final' },
    explanation: {
      simples:
        'Deitado de bruços no chão, você eleva ao mesmo tempo braços e pernas, como se estivesse voando, e segura por um instante.',
      biomecanica: {
        articulacoes: 'Extensão da coluna lombar com extensão simultânea de ombro e quadril.',
        vetorForca: 'Resistência é o peso dos próprios membros contra a gravidade.',
        amplitude: 'Pequena amplitude — elevação controlada sem forçar excessivamente a lombar.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete (opcional)'],
      errosComuns: ['Elevar rápido demais com impulso', 'Forçar amplitude excessiva na lombar'],
      substitutos: ['hiperextensao-lombar', 'prancha-abdominal'],
    },
  },

  // ── MOBILIDADE ────────────────────────────────────────────────────────
  {
    id: 'mobilidade-quadril-90-90',
    name: 'Mobilidade de Quadril 90/90',
    muscleGroups: ['mobilidade'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'mobilidade-90-90',
    difficulty: 'iniciante',
    muscleHighlights: [],
    media: { photoStart: '90-90-inicio', photoEnd: '90-90-final' },
    explanation: {
      simples:
        'Sentado no chão com as duas pernas dobradas a 90°, uma para cada lado, você alterna a rotação do quadril de um lado para o outro, melhorando a flexibilidade do quadril.',
      biomecanica: {
        articulacoes: 'Rotação interna e externa combinadas do quadril bilateral.',
        vetorForca: 'Sem carga externa — o próprio peso do tronco auxilia o alongamento dinâmico.',
        amplitude: 'Rotação completa e controlada entre os dois lados, dentro do conforto articular.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete (opcional)'],
      errosComuns: ['Forçar a rotação além do conforto', 'Usar as mãos para empurrar o joelho com força'],
      substitutos: ['gato-camelo', 'alongamento-dinamico-ombro'],
    },
  },
  {
    id: 'gato-camelo',
    name: 'Gato-Camelo (Mobilidade de Coluna)',
    muscleGroups: ['mobilidade', 'lombar'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'gato-camelo',
    difficulty: 'iniciante',
    muscleHighlights: [],
    media: { photoStart: 'gatocamelo-inicio', photoEnd: 'gatocamelo-final' },
    explanation: {
      simples:
        'Em posição de quatro apoios, você alterna entre arquear as costas para cima (gato) e para baixo (camelo), soltando a coluna.',
      biomecanica: {
        articulacoes: 'Flexão e extensão segmentar de toda a coluna vertebral.',
        vetorForca: 'Movimento sem carga externa, guiado apenas pela contração muscular ativa.',
        amplitude: 'Amplitude completa e lenta entre flexão e extensão máximas confortáveis da coluna.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Tapete'],
      errosComuns: ['Fazer o movimento rápido demais', 'Forçar a amplitude além do confortável'],
      substitutos: ['mobilidade-quadril-90-90', 'alongamento-dinamico-ombro'],
    },
  },
  {
    id: 'alongamento-dinamico-ombro',
    name: 'Alongamento Dinâmico de Ombro (Circundação de Braços)',
    muscleGroups: ['mobilidade', 'ombros'],
    equipment: 'Peso Corporal',
    environment: ['casa', 'academia'],
    thumbnail: 'circundacao-ombro',
    difficulty: 'iniciante',
    muscleHighlights: [],
    media: { photoStart: 'circundacao-inicio', photoEnd: 'circundacao-final' },
    explanation: {
      simples:
        'Em pé, você faz círculos amplos com os braços estendidos, aumentando gradualmente a amplitude, para preparar os ombros antes do treino.',
      biomecanica: {
        articulacoes: 'Circundação do ombro (combinação de flexão, abdução, extensão e adução em sequência).',
        vetorForca: 'Sem resistência externa — foco em amplitude ativa de movimento.',
        amplitude: 'Círculos completos e progressivos, do menor para o maior raio confortável.',
      },
    },
    fichaTecnica: {
      equipamentosNecessarios: ['Nenhum'],
      errosComuns: ['Fazer movimentos bruscos e rápidos demais', 'Forçar amplitude com dor'],
      substitutos: ['mobilidade-quadril-90-90', 'gato-camelo'],
    },
  },
]

/**
 * Aplica as fotos reais encontradas para parte da lista curada acima
 * (ver curatedMediaOverrides.ts) e junta com os exercícios importados.
 * Os 31 exercícios curados sem correspondência confiável continuam
 * usando o card com gradiente + ícone (fallback elegante, nunca imagem
 * quebrada) até termos uma foto real pra eles também.
 */
const curatedWithRealMedia: Exercise[] = curatedExercises.map((ex) => {
  const override = curatedMediaOverrides[ex.id]
  if (!override) return ex
  return {
    ...ex,
    thumbnail: override.photoStart,
    media: { photoStart: override.photoStart, photoEnd: override.photoEnd },
  }
})

// A biblioteca curada (com texto autoral) vem primeiro; os exercícios
// importados completam a cobertura de grupo muscular + equipamento.
export const exercises: Exercise[] = [...curatedWithRealMedia, ...generatedExercises]
