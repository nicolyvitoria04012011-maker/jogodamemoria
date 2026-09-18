# 🐱 Jogo da Memória Felina

Um aplicativo web interativo, moderno e visualmente vibrante de **Jogo da Memória** desenvolvido com **React 19**, **TypeScript**, **Tailwind CSS v4** e **Web Audio API**.

Projetado para partidas dinâmicas entre amigos ou família com suporte para **2 a 4 jogadores**, avatares de gatinhos personalizados, 6 temas imersivos e uma disputa emocionante em exatamente **3 rodadas**!

---

## 🎮 Regras e Como Jogar

1. **Configuração Inicial:**
   - Selecione a quantidade de jogadores (**2 a 4 competidores**).
   - Insira os nomes de cada jogador.
   - Escolha o gatinho de cor diferente para cada competidor (8 opções vibrantes: *Laranja Tigrado, Preto Meia-Noite, Branco Neve, Rosa Algodão, Roxo Cósmico, Azul Celeste, Verde Menta, Dourado Caramelo*).
   - Escolha o **Tema Visual** da partida (cada um muda as cartas, plano de fundo animado, partículas e efeitos sonoros):
     - 🌊 **Oceano Profundo**
     - 🌲 **Floresta Mágica**
     - 🧁 **Reino dos Doces**
     - 🚀 **Espaço Cósmico**
     - 🌻 **Natureza Viva**
     - 🌆 **Cidade Neon**
   - Escolha o tamanho do tabuleiro: **16 cartas (8 pares)** ou **12 cartas (6 pares)**.

2. **Mecânica de Turnos:**
   - O placar superior indica claramente **de quem é a vez**, destacando o gatinho ativo com aura luminosa e tag animada.
   - O jogador da vez clica para virar **duas cartas**:
     - ✅ **Se formarem um par:** O jogador marca **1 ponto**, comemora com efeito sonoro e partículas, e **joga novamente**!
     - ❌ **Se forem diferentes:** As cartas permanecem visíveis momentaneamente para memorização, depois desviram e a vez passa para o próximo jogador.

3. **Fluxo das 3 Rodadas:**
   - A partida possui exatamente **3 rodadas completas**.
   - Ao final de cada rodada, é exibida uma **Tela de Resumo** destacando o vencedor da rodada e a pontuação parcial.
   - Ao fim da 3ª rodada, ocorre a **Grande Final** com pódio dourado, chuva de confetes, coroação do campeão e exibição do histórico de pontos de todos os jogadores.
   - Botão para **Iniciar Nova Partida**, retornando à tela de configuração inicial.

---

## 🛠️ Tecnologias Utilizadas

- **React 19 & TypeScript**: Componentização moderna, tipagem estrita e hooks reativos.
- **Tailwind CSS v4**: Estilização responsiva com gradientes vibrantes, cores chamativas e efeitos visuais 3D.
- **3D Card Flip**: Animações suaves em CSS 3D (`perspective`, `transform-style: preserve-3d`).
- **Web Audio API**: Efeitos sonoros sintetizados em tempo real (virada de cartas, acertos, erros, vitória e trocas de turno), sem dependência de arquivos externos e com controle de mudo (*Mute/Unmute*).
- **Canvas-Confetti**: Efeitos de confete para celebrar acertos e o campeão da partida.
- **Lucide Icons**: Ícones minimalistas e modernos.
- **Vitest**: Suíte completa de testes unitários para a lógica do jogo.

---

## 🧪 Testes Unitários

A lógica essencial do jogo está desacoplada em módulos puros (`src/logic/gameLogic.ts`) e testada com o **Vitest**:

- **Verificação de Pares:** Compara identificadores de itens garantindo que cartas iguais pontuem e cartas diferentes sejam rejeitadas.
- **Alternância de Turnos:** Garante que quem acerta joga novamente, e quem erra passa a vez ciclicamente de 2 a 4 jogadores.
- **Cálculo de Pontuação:** Validação de pontos por rodada e acumulados no total da partida.
- **Progressão de 3 Rodadas:** Confirmação estrita de encerramento após exatamente 3 rodadas.

### Como Rodar os Testes no Terminal:
```bash
npm test
```

> **Dica Interativa:** Você também pode visualizar e reexecutar os testes em tempo real clicando no botão **"Testes Unitários"** no cabeçalho do próprio aplicativo!

---

## 🚀 Como Executar Localmente

### Pré-requisitos:
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passo a passo:

1. **Clone ou baixe os arquivos do projeto:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra o endereço indicado no terminal (normalmente `http://localhost:3000`).

5. **Para gerar a build de produção:**
   ```bash
   npm run build
   ```

---

## 📁 Estrutura do Código

```
/
├── src/
│   ├── components/
│   │   ├── CatAvatar.tsx         # Componente SVG dos gatinhos customizáveis
│   │   ├── GameOverScreen.tsx    # Tela final com pódio, confetes e campeão
│   │   ├── MemoryCard.tsx        # Carta com animação 3D de flip
│   │   ├── RoundSummaryModal.tsx # Resumo após rodadas 1 e 2
│   │   ├── Scoreboard.tsx        # Placar em tempo real e indicador de vez
│   │   ├── SetupScreen.tsx       # Tela inicial de configuração de jogadores e tema
│   │   ├── ThemeBackground.tsx   # Fundo animado temático e partículas
│   │   └── UnitTestsModal.tsx    # Modal para conferir os testes no navegador
│   ├── data/
│   │   └── themesAndAvatars.ts   # Catálogo de temas e variações de gatinhos
│   ├── logic/
│   │   ├── gameLogic.ts          # Lógica pura de regras, pontuação e turnos
│   │   └── gameLogic.test.ts     # Suíte de testes unitários com Vitest
│   ├── utils/
│   │   └── audio.ts              # Sintetizador de efeitos sonoros Web Audio API
│   ├── types.ts                  # Interfaces e tipagem TypeScript
│   ├── App.tsx                   # Controlador de fluxo do jogo
│   ├── main.tsx                  # Ponto de entrada React
│   └── index.css                 # Estilos globais e utilitários 3D
├── index.html                    # Documento HTML principal
├── package.json                  # Scripts e dependências
└── README.md                     # Documentação do projeto
```

Divirta-se jogando o Jogo da Memória Felina! 🐾🎮
