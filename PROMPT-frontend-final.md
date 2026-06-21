# PETMIND — Frontend Implementation Prompt
# Para: Claude Code no Cursor (VS Code)
# Entregar na raiz do repositório frontend vazio

---

## CONTEXTO

Você é um Senior Frontend Developer e Designer.

Vou te passar uma imagem de referência visual oficial do projeto PetMind.
Essa imagem é a source of truth para todos os sprites, cores e estilo visual.
Não invente nada que não esteja alinhado com ela.

O backend já existe e está funcionando. Seu trabalho é APENAS o frontend.

---

## O QUE É O PETMIND

App web de monitoramento emocional de pets reais.
O usuário cadastra seu pet, registra comportamentos diários e recebe
uma análise de IA sobre o estado emocional do animal.

O pet aparece como um sprite pixel art que reage ao estado emocional.

---

## BACKEND PRONTO — NÃO ALTERAR

URL base: `http://localhost:8000` via `VITE_API_URL`

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/pets` | Listar todos os pets |
| POST | `/pets` | Cadastrar pet |
| GET | `/pets/{id}` | Buscar pet |
| POST | `/pets/{id}/registros` | Registrar comportamento |
| GET | `/pets/{id}/registros` | Histórico de registros |
| GET | `/pets/{id}/registros/ultimo` | Último registro com estado emocional |
| POST | `/pets/{id}/analisar` | Análise com IA (Groq) |

### Campos do Pet
```
nome, especie, raca, idade, peso, observacoes
```

### Espécies aceitas
```
cachorro | gato | hamster | coelho
```

### Campos do Registro (valores 1 a 5)
```
agitacao | sono | apetite | humor
```

### Estados emocionais (EXATAMENTE ESSES 6)
```
feliz | agitado | sonolento | com_fome | triste | animado
```

---

## STACK FRONTEND

- React 18 com JSX (NÃO TypeScript)
- Vite
- SCSS Modules — um `.module.scss` por componente e por página
- Axios
- React Router DOM v6
- Google Fonts: Press Start 2P + Nunito + Inter

### Criar o projeto
```bash
npm create vite@latest . -- --template react
npm install axios react-router-dom sass
```

Apagar `App.css` e `index.css` gerados pelo Vite.

---

## REFERÊNCIA VISUAL OFICIAL

A imagem anexada mostra o sprite sheet oficial do PetMind com:

### Os 4 animais e suas características visuais

**Cachorro** — dourado/caramelo
- Orelhas grandes e caídas
- Língua rosa pra fora
- Rabo curvado
- Expressão alegre e energética

**Gato** — cinza com listras escuras
- Orelhas triangulares pontudas
- Olhos verdes amendoados expressivos
- Bigodes brancos
- Cauda longa e curvada

**Hamster** — laranja/salmão
- Bochechas rosadas enormes (característica principal)
- Olhinhos brilhantes e expressivos
- Corpo quase redondo
- Patinhas pequenas

**Coelho** — branco puro
- Orelhas longas com interior rosado
- Olhos vermelhos/rosados (albino)
- Narizinho pequeno
- Cauda redonda atrás

### Sistema de sprites (12 sprites = 4 animais × 3 base)

Conforme a imagem, cada animal tem sprites para cada estado.
Implemente como SVGs inline baseados na imagem de referência.

**Mapeamento estado → sprite:**

| Estado backend | Sprite visual | Animação CSS |
|---|---|---|
| `feliz` | sprite feliz | tail wag suave |
| `animado` | sprite feliz | jumping (translateY) |
| `agitado` | sprite agitado | shake (translateX rápido) |
| `sonolento` | sprite idle | slow breathing + olhos pesados |
| `com_fome` | sprite idle | food bubble aparece |
| `triste` | sprite triste | head down, sem movimento |

### Paleta de cores extraída da imagem

```scss
// Cores da interface (fundo quadriculado)
$cor-papel:     #F5EDE0;   // bege quente do fundo
$cor-grade:     #E0D4C0;   // linhas do quadriculado
$cor-marrom:    #2C1A0E;   // contornos e texto principal

// Cores de destaque (extraídas dos labels da imagem)
$cor-laranja:   #E8651A;   // label Cachorro / ações principais
$cor-cinza:     #8A8A9A;   // label Gato
$cor-salmon:    #E8845A;   // label Hamster
$cor-creme:     #D4C4A0;   // label Coelho

// Cores funcionais
$cor-verde:     #2D8C5E;   // feliz / sucesso
$cor-vermelho:  #C0392B;   // agitado / alerta
$cor-azul:      #3A7CA5;   // sonolento / info
$cor-amarelo:   #F2C94C;   // animado / destaque
$cor-roxo:      #7B5EA7;   // triste

// Cores dos sprites (paleta pixel art da imagem)
$pixel-cachorro-base:    #C8843C;
$pixel-cachorro-escuro:  #8A5A1E;
$pixel-cachorro-claro:   #E8A85A;
$pixel-gato-base:        #8A8A9A;
$pixel-gato-escuro:      #5A5A6A;
$pixel-gato-olho:        #4CAF50;
$pixel-hamster-base:     #E8A46A;
$pixel-hamster-bochecha: #F4A7B9;
$pixel-coelho-base:      #F5F0E8;
$pixel-coelho-orelha:    #F4A7B9;
$pixel-coelho-olho:      #E57373;
$pixel-contorno:         #2C1A0E;
$pixel-branco:           #FFFFFF;
```

---

## REGRA ABSOLUTA DE UNIDADES

NUNCA usar px. Toda medida em unidades relativas:

| Contexto | Unidade |
|---|---|
| font-size | `rem` |
| padding, gap, margin | `rem` |
| larguras | `%` ou `vw` |
| max-width | `rem` |
| border-width | `0.125rem` |
| box-shadow offset | `rem` |
| animações translate | `%` ou `rem` |
| media queries | `em` |
| line-height | unitless |
| SVG viewBox | unitless |

```scss
// ✅ correto
padding: 1.5rem 2rem;
border: 0.125rem solid $cor-marrom;
box-shadow: 0.25rem 0.375rem 0 0 $cor-marrom;
transform: translateY(-1.5rem);

// ❌ proibido
padding: 24px;
border: 2px solid $cor-marrom;
box-shadow: 4px 6px 0 0 $cor-marrom;
```

Escala de espaçamento:
```scss
$space-1: 0.25rem;
$space-2: 0.5rem;
$space-3: 0.75rem;
$space-4: 1rem;
$space-5: 1.5rem;
$space-6: 2rem;
$space-8: 3rem;
$space-10: 4rem;
```

---

## TOKENS VISUAIS

```scss
$borda-organica:  30% 8% 30% 8% / 8% 30% 8% 30%;
$borda-ficha:     0.125rem solid $cor-marrom;
$sombra-solida:   0.25rem 0.375rem 0 0 $cor-marrom;
$sombra-hover:    0.375rem 0.5rem 0 0 $cor-marrom;

$fonte-pixel:   'Press Start 2P', monospace;
$fonte-display: 'Nunito', sans-serif;
$fonte-corpo:   'Inter', sans-serif;
```

---

## FUNDO DA APLICAÇÃO

Papel quadriculado via CSS puro — igual ao fundo da imagem de referência:

```scss
body {
  background-color: $cor-papel;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent calc(2rem - 0.0625rem),
      $cor-grade calc(2rem - 0.0625rem),
      $cor-grade 2rem
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent calc(2rem - 0.0625rem),
      $cor-grade calc(2rem - 0.0625rem),
      $cor-grade 2rem
    );
}
```

---

## ESTRUTURA DE PASTAS

```
src/
├── styles/
│   └── global.scss
├── components/
│   ├── sprites/
│   │   ├── PetSprite.jsx              # Orquestrador de sprites
│   │   ├── PetSprite.module.scss
│   │   ├── SpriteCachorro.jsx         # SVG inline do cachorro
│   │   ├── SpriteCachorro.module.scss
│   │   ├── SpriteGato.jsx
│   │   ├── SpriteGato.module.scss
│   │   ├── SpriteHamster.jsx
│   │   ├── SpriteHamster.module.scss
│   │   ├── SpriteCoelho.jsx
│   │   └── SpriteCoelho.module.scss
│   └── ui/
│       ├── CardPet.jsx
│       ├── CardPet.module.scss
│       ├── SeletorEspecie.jsx
│       ├── SeletorEspecie.module.scss
│       ├── SeletorComportamento.jsx
│       ├── SeletorComportamento.module.scss
│       ├── AnaliseIA.jsx
│       ├── AnaliseIA.module.scss
│       ├── Badge.jsx
│       ├── Badge.module.scss
│       ├── Botao.jsx
│       └── Botao.module.scss
├── pages/
│   ├── Home.jsx
│   ├── Home.module.scss
│   ├── PerfilPet.jsx
│   ├── PerfilPet.module.scss
│   ├── CadastrarPet.jsx
│   ├── CadastrarPet.module.scss
│   ├── Registrar.jsx
│   └── Registrar.module.scss
├── services/
│   └── api.js
└── hooks/
    └── usePet.js
```

---

## SISTEMA DE SPRITES

### PetSprite.jsx — orquestrador

```jsx
// Recebe: especie, estado, tamanho ('p'|'m'|'g')
// Renderiza o sprite correto com a classe de animação do estado

const sprites = {
  cachorro: SpriteCachorro,
  gato: SpriteGato,
  hamster: SpriteHamster,
  coelho: SpriteCoelho,
}

export function PetSprite({ especie, estado, tamanho = 'm' }) {
  const Sprite = sprites[especie] ?? SpriteCachorro
  return <Sprite estado={estado} tamanho={tamanho} />
}
```

### Cada sprite — estrutura SVG

```jsx
// Exemplo: SpriteCachorro.jsx
export function SpriteCachorro({ estado, tamanho }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${styles.sprite} ${styles[tamanho]} ${styles[estado]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corpo, cabeça, orelhas, olhos, nariz, rabo */}
      {/* Baseado na imagem de referência */}
    </svg>
  )
}
```

### Animações CSS por estado

```scss
// SpriteCachorro.module.scss

.sprite {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  transition: transform 0.3s ease;
}

// Tamanhos
.p { width: 4rem;   height: 4rem; }
.m { width: 8rem;   height: 8rem; }
.g { width: 14rem;  height: 14rem; }

// Estados
@keyframes tailWag {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(3deg); }
}
@keyframes jump {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20%); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-5%); }
  75%       { transform: translateX(5%); }
}
@keyframes breathe {
  0%, 100% { transform: scaleY(1); }
  50%       { transform: scaleY(1.03); }
}

.feliz    { animation: tailWag 0.6s ease-in-out infinite; }
.animado  { animation: jump 0.5s ease-in-out infinite; }
.agitado  { animation: shake 0.3s ease-in-out infinite; }
.sonolento { animation: breathe 2s ease-in-out infinite; opacity: 0.85; }
.com_fome { animation: breathe 1.5s ease-in-out infinite; }
.triste   { opacity: 0.75; filter: saturate(0.7); }
```

---

## PÁGINAS

### Home.jsx

- Header: logo "🐾 PETMIND" em `$fonte-pixel` + `font-size: 1.5rem`
- Grid de pets: 1 col < 40em, 2 cols < 64em, 3 cols acima
- Cada card: sprite tamanho médio + nome + badge estado + último registro
- Estado vazio: sprite triste centralizado + texto "Nenhum pet cadastrado"
- FAB "+" fixo: `position: fixed`, `bottom: 2rem`, `right: 2rem`

### PerfilPet.jsx

- Sprite tamanho grande centralizado
- Nome em `font-size: clamp(1.25rem, 4vw, 2rem)`, `$fonte-display`
- Badge do estado atual
- Grid 2x2 de métricas: agitação, sono, apetite, humor
  - Cada métrica: label + valor + barra de progresso estilo pixel
- Botões: "Registrar hoje" + "Analisar com IA 🧠"
- Componente AnaliseIA aparece após análise
- Histórico de registros em cards menores

### CadastrarPet.jsx

- Seletor de espécie: 4 cards grandes com sprite idle de cada animal
- Card selecionado: borda `$cor-laranja` + sombra `$sombra-hover`
- Ao selecionar: sprite faz animação `animado`
- Campos: nome, raça, idade, peso, observações
- `max-width: 38rem`, centralizado com `margin: 0 auto`

### Registrar.jsx

- Sprite tamanho médio no topo reagindo em tempo real
- Calcular estado localmente enquanto os seletores mudam:
```js
function calcularEstado(agitacao, sono, apetite, humor) {
  if (agitacao >= 4 && sono >= 4 && apetite >= 4 && humor >= 4) return 'animado'
  if (agitacao >= 4) return 'agitado'
  if (humor <= 2 && agitacao <= 2) return 'triste'
  if (sono <= 2) return 'sonolento'
  if (apetite <= 2) return 'com_fome'
  return 'feliz'
}
```
- Seletores de comportamento: cards clicáveis com ícone + label
  NÃO usar sliders ou inputs range padrão do browser

**Seletores (cards visuais):**

Agitação:
- 😴 Muito calmo (1)
- 🙂 Calmo (2)
- 😐 Normal (3)
- 😤 Agitado (4)
- 🌪️ Muito agitado (5)

Sono:
- 😵 Péssimo (1)
- 😪 Ruim (2)
- 😐 Normal (3)
- 😴 Bom (4)
- 🌙 Ótimo (5)

Apetite:
- 🚫 Recusou (1)
- 😒 Pouco (2)
- 😐 Normal (3)
- 🍖 Bastante (4)
- 🍽️ Devorou (5)

Humor:
- 😢 Triste (1)
- 😟 Abatido (2)
- 😐 Neutro (3)
- 😊 Alegre (4)
- 🤩 Eufórico (5)

---

## COMPONENTES UI

### CardPet.jsx + CardPet.module.scss

```scss
.card {
  background: white;
  border: $borda-ficha;
  border-radius: $borda-organica;
  box-shadow: $sombra-solida;
  padding: $space-5;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  // Dobra no canto superior direito
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    background: linear-gradient(225deg, $cor-papel 45%, $cor-grade 45%);
  }

  &:hover {
    transform: translate(-0.125rem, -0.125rem);
    box-shadow: $sombra-hover;
  }
}
```

### Badge.jsx + Badge.module.scss

Pill por estado. `font-family: $fonte-pixel`, `font-size: 0.5rem`.

```scss
.badge { border-radius: 50rem; padding: 0.375rem 0.75rem; font-weight: 700; }
.feliz    { background: $cor-verde;    color: white; }
.animado  { background: $cor-amarelo;  color: $cor-marrom; }
.agitado  { background: $cor-vermelho; color: white; }
.sonolento { background: $cor-azul;   color: white; }
.com_fome  { background: $cor-laranja; color: white; }
.triste   { background: $cor-roxo;    color: white; }
```

### Botao.jsx + Botao.module.scss

```scss
.botao {
  font-family: $fonte-display;
  font-weight: 800;
  padding: 0.75rem 1.5rem;
  border: 0.125rem solid $cor-marrom;
  border-radius: 0.5rem;
  box-shadow: $sombra-solida;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  cursor: pointer;

  &:hover {
    transform: translate(0.125rem, 0.125rem);
    box-shadow: none;
  }
}
.primario  { background: $cor-laranja; color: white; }
.secundario { background: white; color: $cor-marrom; }
```

### AnaliseIA.jsx + AnaliseIA.module.scss

- Loading: sprite "animado" + texto "Analisando..." em `$fonte-pixel`
- Card resultado estilo ficha veterinária
- Estado emocional em badge grande
- Texto da análise em `$fonte-corpo`, `line-height: 1.7`
- Total de registros e data no rodapé

---

## GAMIFICAÇÃO (leve)

Badges desbloqueáveis salvos em localStorage:
- 🐾 Primeiro Registro
- 📅 7 Dias Seguidos
- 🏆 30 Dias Seguidos
- 🧠 Especialista PetMind

Exibir no perfil do pet como ícones pequenos.
Não transformar o app em jogo — apenas reconhecimento sutil.

---

## API SERVICE

```js
// src/services/api.js
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const listarPets        = ()        => api.get('/pets')
export const buscarPet         = (id)      => api.get(`/pets/${id}`)
export const cadastrarPet      = (dados)   => api.post('/pets', dados)
export const adicionarRegistro = (id, d)   => api.post(`/pets/${id}/registros`, d)
export const listarRegistros   = (id)      => api.get(`/pets/${id}/registros`)
export const ultimoRegistro    = (id)      => api.get(`/pets/${id}/registros/ultimo`)
export const analisarPet       = (id)      => api.post(`/pets/${id}/analisar`)

export function calcularEstado(agitacao, sono, apetite, humor) {
  if (agitacao >= 4 && sono >= 4 && apetite >= 4 && humor >= 4) return 'animado'
  if (agitacao >= 4) return 'agitado'
  if (humor <= 2 && agitacao <= 2) return 'triste'
  if (sono <= 2) return 'sonolento'
  if (apetite <= 2) return 'com_fome'
  return 'feliz'
}
```

---

## REGRAS ABSOLUTAS — NUNCA VIOLE

1. JSX puro — sem TypeScript
2. SCSS Modules — um `.module.scss` por componente/página
3. Zero px — rem, %, vw, vh, em ou unitless
4. Sem Tailwind, Bootstrap, Material UI ou qualquer UI kit
5. SVGs inline para os sprites — nunca `<img>`
6. `image-rendering: pixelated` em todos os sprites
7. Sem device, sem Tamagotchi, sem moldura de console
8. O animal aparece diretamente na interface
9. Sombras sempre sólidas — sem blur
10. Border-radius assimétrico nos cards principais
11. Animações apenas com CSS `@keyframes` — sem framer-motion ou similares
12. Sprites baseados na imagem de referência anexada

---

## .env

```
VITE_API_URL=http://localhost:8000
```

---

## INSTRUÇÃO FINAL

A imagem anexada é a fonte de verdade visual.
Todos os sprites devem ser fiéis ao estilo, proporções e paleta da imagem.
Implemente os SVGs inline com `<rect>` em viewBox 32x32,
seguindo pixel a pixel o estilo mostrado na imagem de referência.
