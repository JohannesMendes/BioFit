# BioFit

App fitness + biomecânico: do praticante leigo ao científico. Ensina o **por quê**, o **como** e o **onde** de cada exercício atua no corpo.

## Identidade visual (aprovada)

- **Nome:** BioFit
- **Paleta:** Bio-Elétrico (verde-lima `#C6FF3A` + preto `#0A0B0A` + branco `#FBFCFA`) — o verde nunca decora, ele sempre significa "alvo / ativo".
- **Modo padrão:** Dark Mode
- Tokens completos em `src/index.css` (bloco `@theme`).

## Biblioteca de exercícios

46 exercícios cobrindo os 12 grupos musculares (Peito, Costas, Ombros, Bíceps, Tríceps, Quadríceps, Posterior de coxa, Glúteos, Panturrilha, Abdômen, Lombar, Mobilidade), com variação de equipamento (Barra, Halter, Polia, Máquina, Peso Corporal, Banco, Elástico) e dificuldade (iniciante → avançado), em `src/data/exercises.ts`. Para adicionar mais, siga o mesmo formato — cada exercício já tem ficha técnica, explicação leigo/científico e destaque no mapa muscular.

## Ativando o login real com Google

Por padrão, "Entrar com Google" funciona em **modo demo** (cria uma conta de exemplo) — não mostra o seletor de contas real porque isso exige credenciais próprias do Google. Para ativar de verdade:

1. Acesse [console.cloud.google.com](https://console.cloud.google.com/) e crie um projeto (gratuito).
2. Vá em **APIs & Services → Credentials → Create Credentials → OAuth Client ID**, tipo **Web application**.
3. Em **Authorized JavaScript origins**, adicione as URLs onde o app roda: `http://localhost:5173` (dev) e o domínio de produção (ex.: `https://seuapp.vercel.app`).
4. Copie o **Client ID** gerado.
5. Crie um arquivo `.env` na raiz (copie de `.env.example`) e cole:
   ```
   VITE_GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
   ```
6. Reinicie `npm run dev`. O botão oficial do Google (com o seletor de contas de verdade) substitui automaticamente o botão de demo.

Toda a lógica já está pronta em `src/lib/googleAuth.ts` e `src/context/AuthContext.tsx` — só falta o Client ID.

## Integração com exercisedb-api (AscendAPI)

O app agora consome o [exercisedb-api](https://github.com/ExerciseDB/exercisedb-api) (repositório open source da AscendAPI) como fonte primária de exercícios — GIFs reais, nomes, músculo alvo/secundários e instruções de execução, vindos direto da API.

**Como funciona:**
- `src/types/exerciseApi.ts` — tipos fiéis ao payload real da API (`exerciseId`, `targetMuscles[]`, `bodyParts[]`, `equipments[]`) + uma view normalizada no singular.
- `src/services/exerciseApi.ts` — busca a biblioteca completa uma vez (cacheada em memória), com fallback automático para a biblioteca local se a API estiver fora do ar.
- `src/lib/exerciseDbMappings.ts` — dicionários traduzindo a taxonomia em inglês da API (`chest`, `pectorals`, `barbell`...) para a nossa (`peito`, `peitoral-maior`, `Barra`...).
- `src/lib/exerciseDbAdapter.ts` — normaliza cada exercício da API para a interface `Exercise` do app, preenchendo as abas Simples/Científica a partir do que a API oferece.
- `src/hooks/useExerciseLibrary.ts` — hook usado pelas telas de lista e detalhe.

**Limitações honestas do tier gratuito** (refletidas no app, não escondidas):
- Sem dado estruturado de biomecânica (vetor de força, articulação, amplitude) — só instruções em texto livre. A aba "Biomecânica Científica" informa isso explicitamente quando a informação não está disponível, em vez de inventar.
- Sem "erros comuns" nem "exercícios substitutos" — esses campos mostram um aviso.
- 1 GIF por exercício, sem fotos separadas de início/fim.
- Sem campo de dificuldade — todos os exercícios da API entram como "intermediário" por padrão.

**⚠️ Sobre o endpoint gratuito (`oss.exercisedb.dev`):** os próprios mantenedores o descrevem como "para exploração, não recomendado para produção" — sem chave, sujeito a instabilidade e rate limit. Por isso o app tem fallback automático para a biblioteca local (`src/data/exercises.ts`, com biomecânica detalhada escrita à mão) sempre que a API externa falhar. Para produção de verdade, considere:
1. O plano pago via RapidAPI (mais dados: dificuldade, vídeos, exercícios relacionados) — ver [docs.ascendapi.com](https://docs.ascendapi.com/products/edb-v1/overview), ou
2. Hospedar sua própria instância do repositório (é open source, com deploy de 1 clique).

Em ambos os casos, o ideal é fazer a chamada a partir do seu próprio backend (não direto do navegador), para não expor limites de uso e poder cachear no servidor.

**Nota de transparência:** esta integração foi escrita a partir da documentação pública da API, mas não pôde ser testada ao vivo no ambiente onde foi gerada (sem acesso de rede a domínios externos). Teste com `npm run dev` — se algum campo ou endpoint tiver mudado, ajuste as constantes no topo de `services/exerciseApi.ts`; a doc interativa fica em [oss.exercisedb.dev/docs](https://oss.exercisedb.dev/docs).

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist para deploy (Vercel/Netlify)
```

Requer Node 18+.

## Arquitetura do Mobile Frame (requisito estilo Oriz)

`src/components/layout/MobileFrame.tsx` detecta a largura da janela:
- **≥ 860px (desktop/PC):** o app renderiza centralizado dentro de um mockup de smartphone (bordas, notch, sombra).
- **< 860px (celular real):** o frame é ignorado e o app ocupa `100dvh` / `100%` da tela, como um PWA nativo.

Redimensione a janela do navegador para testar os dois comportamentos sem precisar de um device físico.

## Estrutura de pastas

```
src/
  types/              # modelo de dados (Exercise, MuscleGroup, etc.)
  data/               # mock data — trocar por chamadas de API/CMS depois
    categories.ts      # grupos musculares da Home
    exercises.ts       # biblioteca de exercícios (Bloco 3 completo)
  components/
    layout/             # MobileFrame, TopBar, BottomNav
    media/              # MediaPlaceholder (stand-in para foto/vídeo real)
    home/               # CategoryCard
    exercises/          # EnvironmentToggle, LocalSearch, ExerciseCard
    exercise-detail/    # MediaTabs, MuscleMap (SVG anatômico), ExplanationTabs, TechnicalSheet
    auth/               # LoginForm, SignupForm, ForgotPasswordForm, AuthInput
  pages/                # uma página por rota
    auth/                 # Login, Signup, ForgotPassword (+ AuthShell)
  App.tsx               # rotas (react-router-dom)
  main.tsx              # bootstrap
  index.css             # design tokens (Tailwind v4 @theme)
```

## Mapeando os 3 blocos do briefing

| Bloco | Onde está |
|---|---|
| 1. Autenticação | `pages/auth/*`, `components/auth/*` |
| 2. Navegação/Descoberta | `pages/Home.tsx`, `pages/ExerciseList.tsx`, `components/home/CategoryCard.tsx` |
| 3. Tela detalhada do exercício | `pages/ExerciseDetail.tsx` orquestra `MediaTabs` (vídeo / foto+anatomia), `ExplanationTabs` (leigo/científico) e `TechnicalSheet` (equipamento, erros, substitutos) |

## Próximos passos técnicos (fora do escopo desta entrega)

- Trocar `MediaPlaceholder` por `<video>`/`<img>` reais apontando para um bucket (S3/Cloudinary) ou CMS.
- `MuscleMap.tsx` usa um SVG simplificado desenhado à mão; pode ser substituído por um atlas anatômico traçado em detalhe (mesma técnica usada pela MuscleWiki), mantendo os mesmos `id`s de músculo.
- Autenticação real (Firebase Auth, Supabase Auth ou backend próprio) — os formulários atuais são apenas UI.
- Persistência de favoritos/histórico de treino.
