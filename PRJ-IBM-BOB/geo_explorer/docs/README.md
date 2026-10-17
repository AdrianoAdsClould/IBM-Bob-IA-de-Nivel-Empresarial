# 🌍 GEO-EXPLORER

> Sistema de exploração de trilhas de aprendizagem DIO × IBM Bob

Desenvolvido com o IBM Bob como parte da formação DIO — **IBM Bob IA de Nível Empresarial**.

---

## 📁 Estrutura do Projeto

```
geo_explorer/
├── commands/
│   ├── types.ts          ← Interfaces compartilhadas
│   ├── trilha.ts         ← Comando /trilha
│   ├── desafio.ts        ← Comando /desafio
│   ├── certificado.ts    ← Comando /certificado
│   └── index.ts          ← Roteador central (processarComando)
├── data/
│   └── trilhas_dio.json  ← 20 trilhas fictícias DIO
├── docs/
│   └── certificados-emitidos/  ← Gerado automaticamente
├── tests/
│   ├── trilha.test.ts
│   ├── desafio.test.ts
│   ├── certificado.test.ts
│   └── run-all-tests.ts
├── mcp/
│   ├── src/
│   │   ├── index.ts      ← Entry-point do servidor MCP
│   │   ├── tools.ts      ← Registro das 4 ferramentas MCP
│   │   ├── services.ts   ← Lógica de negócio compartilhada
│   │   └── types.ts      ← Interfaces do MCP
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Como Usar — Slash Commands no IBM Bob

Os comandos ficam em `.bob/commands/` e aparecem automaticamente no menu `/` do Bob.

### `/trilha <tecnologia>`
Recebe o nome de uma tecnologia e retorna o plano de estudos completo.

```
/trilha Python
/trilha React
/trilha Java
```

### `/desafio <tecnologia> [nivel]`
Gera um desafio de código conforme a tecnologia e o nível (Básico, Intermediário, Avançado).

```
/desafio Python Avançado
/desafio React Intermediário
/desafio JavaScript Básico
```

### `/certificado "<nome>" "<trilha>"`
Gera um certificado fictício em Markdown e salva em `docs/certificados-emitidos/`.

```
/certificado "João Silva" "Python"
/certificado "Maria Santos" "React"
```

---

## 🛠️ Instalação e Execução Local

### Pré-requisitos
- Node.js >= 18
- npm ou yarn

### Comandos (raiz do geo_explorer)

```bash
# Instalar dependências
npm install

# Rodar todos os testes
npm test

# Rodar teste individual
npm run test:trilha
npm run test:desafio
npm run test:certificado
```

### Build e execução do MCP Server

```bash
cd mcp
npm install
npm run build
```

Após o build, registre em `.bob/mcp.json`:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["/caminho/absoluto/PRJ-IBM-BOB/geo_explorer/mcp/build/index.js"]
    }
  }
}
```

---

## 🔧 Ferramentas MCP Disponíveis

| Ferramenta | Descrição |
|---|---|
| `listar-trilhas` | Lista todas as trilhas disponíveis |
| `buscar-trilha` | Busca trilha por tecnologia |
| `gerar-desafio` | Gera desafio por tecnologia e nível |
| `emitir-certificado` | Emite certificado fictício |

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

## ✅ Testes

```
📚 Testes — executarComandoTrilha    → 12 assertions
⚔️  Testes — executarComandoDesafio  → 14 assertions
🏆 Testes — executarComandoCertificado → 17 assertions
```

---

## 📜 Licença

MIT — DIO Digital Innovation One × IBM Bob

*Made with Bob*
