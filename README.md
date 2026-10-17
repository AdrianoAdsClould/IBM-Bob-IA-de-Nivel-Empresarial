# 🌍 GEO-EXPLORER

> Projeto de portfólio desenvolvido com **IBM Bob** como parte da formação **IBM Bob IA de Nível Empresarial** da [DIO — Digital Innovation One](https://dio.me).

---

## 📌 O que é o Geo-Explorer?

O **Geo-Explorer** é um sistema de exploração de trilhas de aprendizagem que integra o IBM Bob com uma base de dados fictícia de formações tecnológicas da plataforma DIO.

A proposta é simples: por meio de três comandos slash diretamente no chat do Bob, o usuário consegue:

- 📚 **Consultar uma trilha** — recebe um plano de estudos estruturado por fases com a tecnologia escolhida;
- ⚔️ **Receber um desafio de código** — obtém um exercício contextualizado, com requisitos, dicas progressivas e exemplos de entrada/saída;
- 🏆 **Gerar um certificado fictício** — emite um documento Markdown de conclusão que é salvo localmente.

O projeto também expõe essas três funcionalidades como um **Servidor MCP local** (Model Context Protocol), permitindo que o IBM Bob acesse as ferramentas de forma nativa via protocolo.

---

## 📁 Estrutura do Projeto

```
IBM-Bob-IA-de-Nivel-Empresarial/
├── .bob/
│   ├── commands/               ← Slash commands do Bob
│   │   ├── trilha.md
│   │   ├── desafio.md
│   │   └── certificado.md
│   ├── slash-commands.json     ← Registro dos comandos (compatível com projeto de referência)
│   └── skills/                 ← Skills auxiliares
│
└── PRJ-IBM-BOB/
    └── geo_explorer/
        ├── commands/
        │   ├── types.ts        ← Interfaces: Trilha, TrilhasData, Desafio
        │   ├── trilha.ts       ← Lógica do comando /trilha
        │   ├── desafio.ts      ← Lógica do comando /desafio (banco de 12 desafios reais)
        │   ├── certificado.ts  ← Lógica do /certificado (salva .md em disco)
        │   └── index.ts        ← Roteador central: processarComando()
        ├── data/
        │   └── trilhas_dio.json ← 20 trilhas fictícias DIO
        ├── docs/
        │   └── README.md
        ├── tests/
        │   ├── trilha.test.ts
        │   ├── desafio.test.ts
        │   ├── certificado.test.ts
        │   └── run-all-tests.ts
        ├── mcp/
        │   ├── src/
        │   │   ├── index.ts    ← Entry-point do servidor MCP (stdio)
        │   │   ├── tools.ts    ← 4 ferramentas registradas via registerTool
        │   │   ├── services.ts ← Lógica de negócio reutilizável
        │   │   └── types.ts    ← Interfaces do MCP
        │   ├── package.json
        │   └── tsconfig.json
        ├── package.json
        └── tsconfig.json
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9
- [IBM Bob IDE](https://marketplace.visualstudio.com/items?itemName=IBM.wca-vscode-ext) instalado

### 1. Instalar dependências dos comandos

```bash
cd PRJ-IBM-BOB/geo_explorer
npm install
```

### 2. Instalar dependências e compilar o servidor MCP

```bash
cd PRJ-IBM-BOB/geo_explorer/mcp
npm install
npm run build
```

### 3. Registrar o MCP Server no Bob

Crie o arquivo `.bob/mcp.json` na raiz do projeto com o caminho absoluto gerado no seu ambiente:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["/caminho/absoluto/ate/PRJ-IBM-BOB/geo_explorer/mcp/build/index.js"]
    }
  }
}
```

> ⚠️ **Atenção:** o arquivo `.bob/mcp.json` está no `.gitignore` porque contém caminhos absolutos específicos da sua máquina. Nunca envie esse arquivo para o GitHub.

---

## 💬 Como Usar os Comandos

Os slash commands ficam em `.bob/commands/` e aparecem automaticamente no menu `/` do IBM Bob.

### `/trilha <tecnologia>`

Consulta a base de trilhas e retorna um **plano de estudos completo** em 3 fases, com badges, lives ao vivo e promoções ativas.

```
/trilha Python
/trilha React
/trilha Java
/trilha AWS
```

**Exemplo de saída:**
```
🎯 Plano de Estudos — Python

📊 Informações Gerais
- Tecnologia: Python
- Nível: Básico
- Módulos: 10
- XP Total: 38.000 pontos

📝 Plano de Estudos Sugerido
Fase 1 — Fundamentos (Módulos 1–4): conceitos básicos, sintaxe...
Fase 2 — Intermediário (Módulos 5–7): padrões e integração...
Fase 3 — Avançado (Módulos 8–10): arquitetura e produção...
```

---

### `/desafio <tecnologia> [nivel]`

Gera um **desafio de código** contextualizado, com requisitos, dicas progressivas e exemplos de I/O.

Os níveis aceitos são: `Básico` (100 XP) · `Intermediário` (250 XP) · `Avançado` (500 XP).

```
/desafio Python Básico
/desafio React Intermediário
/desafio Java Avançado
/desafio JavaScript
```

**Exemplo de saída:**
```
⚔️ Desafio de Código — Python
## Calculadora de Fibonacci com Memoization

Dificuldade: Básico | Pontos: 100 XP

Requisitos:
1. Função que recebe inteiro n e retorna F(n)
2. Implementar cache para evitar recálculos
...

Dicas:
- Use um dicionário como cache: memo = {}
- Caso base: F(0)=0, F(1)=1
...
```

---

### `/certificado "<nome>" "<trilha>"`

Gera um **certificado fictício em Markdown**, salvo automaticamente em `docs/certificados-emitidos/`, com código único de verificação.

```
/certificado "João Silva" "Python"
/certificado "Maria Santos" "React"
/certificado "Pedro Oliveira" "Java"
```

**Exemplo de saída:**
```
✅ Certificado Gerado com Sucesso!
🎉 Parabéns, João Silva!

Código: DIO-2-2025-XKQM
Arquivo: .../docs/certificados-emitidos/cert_João_Silva_Python_...md
```

---

## 🧪 Como Executar os Testes

Na pasta `PRJ-IBM-BOB/geo_explorer`:

```bash
# Rodar todos os testes de uma vez
npm test

# Rodar suite individual
npm run test:trilha
npm run test:desafio
npm run test:certificado
```

**Resultado esperado:**

```
====================================
  GEO-EXPLORER — Suite de Testes
====================================

📚 Suite: Trilha    → 12/12 ✅
⚔️  Suite: Desafio   → 14/14 ✅
🏆 Suite: Certificado → 17/17 ✅

====================================
✅ Passaram : 43
❌ Falharam : 0
⏱️  Duração  : ~5s
====================================
🎉 Todos os testes passaram!
```

Os testes validam: busca case-insensitive, tratamento de tecnologia inválida, geração de código único por certificado, criação de arquivo em disco, níveis de dificuldade e muito mais.

---

## 🔧 Ferramentas MCP Disponíveis

Após registrar o servidor MCP no Bob, as seguintes ferramentas ficam disponíveis nativamente:

| Ferramenta | Descrição |
|---|---|
| `listar-trilhas` | Lista todas as 20 trilhas com tecnologia, nível e XP |
| `buscar-trilha` | Retorna plano de estudos completo por tecnologia |
| `gerar-desafio` | Gera desafio contextualizado por tecnologia e nível |
| `emitir-certificado` | Emite certificado fictício de conclusão |

---

## ✨ Melhorias Realizadas

Em relação ao projeto base da formação, foram adicionadas as seguintes melhorias:

1. **`types.ts` centralizado** — interfaces `Trilha`, `TrilhasData` e `Desafio` em arquivo único, eliminando duplicação entre os módulos.

2. **Banco de desafios reais** — 12 desafios com enunciados completos (não genéricos) para Python, Java, React e JavaScript, com 3 níveis cada (Básico, Intermediário, Avançado).

3. **Tokenizador de aspas** — o roteador `processarComando()` interpreta corretamente argumentos com espaços entre aspas duplas, como `/certificado "João Silva" "React"`.

4. **Fallback inteligente** — quando a tecnologia não tem desafio específico no banco, o sistema gera um desafio genérico contextualizado em vez de retornar erro.

5. **Suite de testes com 43 assertions** — cobertura de casos de sucesso, erros, edge cases (string vazia, nível inválido, código único por certificado, escrita em disco).

6. **Servidor MCP completo** — 4 ferramentas tipadas registradas via `registerTool` da SDK oficial do MCP, com tratamento de erros e `isError: true` para falhas recuperáveis.

7. **`.gitignore` e segurança** — `node_modules/`, `build/`, `.env*`, `.bob/mcp.json` (que contém caminho absoluto) e certificados gerados localmente são ignorados pelo Git.

---

## 📖 O que Aprendi Durante o Desafio

Este projeto foi construído inteiramente com o IBM Bob como par de programação. O aprendizado foi em múltiplas dimensões:

**Sobre o IBM Bob e MCP:**
- Slash commands locais (`.bob/commands/*.md`) são a forma nativa e mais simples de estender o Bob com comportamentos customizados por projeto.
- O Model Context Protocol (MCP) permite ir além: transforma lógica TypeScript em ferramentas que o Bob invoca nativamente, com tipagem e tratamento de erros estruturado.
- O transporte `stdio` é o padrão para servidores MCP locais — o Bob gerencia o processo filho automaticamente via `mcp.json`.

**Sobre TypeScript e arquitetura:**
- O `module: Node16` + `moduleResolution: Node16` do `tsconfig.json` exige que imports de módulos locais usem extensão `.js` mesmo em arquivos `.ts` — isso causou erros de build que foram depurados iterativamente.
- Separar interfaces em `types.ts` e lógica de serviço em `services.ts` torna o código testável e reutilizável entre o módulo de comandos e o servidor MCP.
- Retornar `{ content, isError: true }` em vez de lançar exceções é a forma correta de reportar falhas recuperáveis em ferramentas MCP.

**Sobre o processo de desenvolvimento com IA:**
- Descrever o comportamento esperado com clareza (entrada, saída, casos de borda) produz código mais correto do que especificar a implementação.
- Testes automatizados escritos junto com a implementação revelaram bugs de tokenização e formatação antes que chegassem ao usuário.
- Revisar os arquivos gerados pelo agente é essencial — especialmente para evitar que caminhos absolutos, tokens ou configurações locais sejam enviados ao repositório.

---

## 📊 Trilhas Disponíveis (20 trilhas)

| ID | Tecnologia | Nível | XP |
|----|-----------|-------|-----|
| 1 | Java | Intermediário | 48.000 |
| 2 | Python | Básico | 38.000 |
| 3 | Machine Learning | Avançado | 72.000 |
| 4 | React | Intermediário | 52.000 |
| 5 | Angular | Intermediário | 49.000 |
| 6 | AWS | Intermediário | 65.000 |
| 7 | Azure | Básico | 40.000 |
| 8 | DevOps | Avançado | 60.000 |
| 9 | Node.js | Intermediário | 45.000 |
| 10 | Data Science | Intermediário | 58.000 |
| 11 | Engenharia de Dados | Avançado | 80.000 |
| 12 | Flutter | Intermediário | 46.000 |
| 13 | IA Generativa | Avançado | 75.000 |
| 14 | Cybersecurity | Avançado | 70.000 |
| 15 | .NET | Intermediário | 50.000 |
| 16 | Blockchain | Avançado | 68.000 |
| 17 | SQL | Básico | 34.000 |
| 18 | CI/CD | Avançado | 71.000 |
| 19 | Unity | Intermediário | 55.000 |
| 20 | IBM Watson | Avançado | 85.000 |

---

## 🔒 Segurança — O que NÃO enviar ao GitHub

Antes de qualquer `git push`, verifique:

| Arquivo | Por quê ignorar |
|---|---|
| `.bob/mcp.json` | Contém caminho absoluto específico da sua máquina |
| `node_modules/` | Dependências geradas localmente |
| `mcp/build/` | Artefatos de compilação TypeScript |
| `.env` / `.env.*` | Variáveis de ambiente (API keys, tokens) |
| `docs/certificados-emitidos/` | Dados pessoais gerados localmente |

Todos esses padrões já estão configurados no [`.gitignore`](.gitignore) na raiz do projeto.

---

## 📜 Licença

MIT — DIO Digital Innovation One × IBM Bob

*Made with Bob*
