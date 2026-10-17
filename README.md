# 🌍 GEO-EXPLORER

Projeto criado durante a formação **IBM Bob IA de Nível Empresarial**, da [DIO — Digital Innovation One](https://dio.me).

Este projeto foi uma oportunidade de começar a aprender como usar o **IBM Bob como um assistente de programação**, ajudando a criar funcionalidades, organizar o código e testar o que foi desenvolvido.

---

## 📌 O que é o Geo-Explorer?

O **Geo-Explorer** é um projeto que simula uma plataforma de trilhas de aprendizagem na área de tecnologia, usando como exemplo cursos e formações fictícias da DIO.

A ideia foi criar comandos simples para consultar trilhas, praticar programação e gerar certificados fictícios, tudo com a ajuda do IBM Bob.

O projeto possui três comandos principais:

- 📚 **Consultar uma trilha:** mostra um plano de estudos dividido em etapas para uma tecnologia.
- ⚔️ **Gerar um desafio:** apresenta um exercício de programação com instruções, dicas e exemplos.
- 🏆 **Gerar um certificado:** cria um certificado fictício em Markdown e salva o arquivo no computador.

Além disso, também desenvolvi um servidor MCP local para permitir que o IBM Bob utilize essas funcionalidades como ferramentas.

Durante o desenvolvimento, fui aprendendo aos poucos como organizar os arquivos, escrever o código com a ajuda da IA e corrigir os erros que apareceram pelo caminho.

---

## 📁 Estrutura do Projeto

Abaixo está a organização principal dos arquivos:

```text
IBM-Bob-IA-de-Nivel-Empresarial/
├── .bob/
│   ├── commands/
│   │   ├── trilha.md
│   │   ├── desafio.md
│   │   └── certificado.md
│   ├── slash-commands.json
│   └── skills/
│
└── PRJ-IBM-BOB/
    └── geo_explorer/
        ├── commands/
        │   ├── types.ts
        │   ├── trilha.ts
        │   ├── desafio.ts
        │   ├── certificado.ts
        │   └── index.ts
        ├── data/
        │   └── trilhas_dio.json
        ├── docs/
        │   └── README.md
        ├── tests/
        │   ├── trilha.test.ts
        │   ├── desafio.test.ts
        │   ├── certificado.test.ts
        │   └── run-all-tests.ts
        ├── mcp/
        │   ├── src/
        │   │   ├── index.ts
        │   │   ├── tools.ts
        │   │   ├── services.ts
        │   │   └── types.ts
        │   ├── package.json
        │   └── tsconfig.json
        ├── package.json
        └── tsconfig.json
```

Cada arquivo tem uma função no projeto. Alguns cuidam dos comandos, outros guardam os dados das trilhas, executam os testes ou fazem a comunicação com o servidor MCP.

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) versão 18 ou superior.
- npm versão 9 ou superior.
- [IBM Bob IDE](https://marketplace.visualstudio.com/items?itemName=IBM.wca-vscode-ext).

### 1. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
cd PRJ-IBM-BOB/geo_explorer
npm install
```

Esse comando instala as dependências necessárias para executar o projeto.

### 2. Preparar o servidor MCP

Entre na pasta do servidor MCP, instale as dependências e compile o código:

```bash
cd mcp
npm install
npm run build
```

A compilação transforma os arquivos TypeScript no código JavaScript que será executado pelo Node.js.

### 3. Configurar o MCP no IBM Bob

Para que o Bob encontre o servidor, crie o arquivo `.bob/mcp.json` na raiz do projeto.

Exemplo de configuração:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": [
        "/caminho/absoluto/ate/geo_explorer/mcp/build/index.js"
      ]
    }
  }
}
```

Substitua o caminho de exemplo pelo caminho completo do arquivo gerado no seu computador.

**Importante:** esse arquivo está no `.gitignore`, pois contém um caminho específico do ambiente local. Não envie essa configuração pessoal para o GitHub.

---

## 💬 Como usar os comandos

Uma das partes mais interessantes do projeto foi aprender a criar comandos personalizados para o IBM Bob.

Os comandos ficam na pasta `.bob/commands/` e podem ser utilizados pelo menu de comandos do Bob, conforme a configuração do projeto.

### 📚 1. Consultar uma trilha

O comando `/trilha` permite consultar uma tecnologia e receber uma sugestão de plano de estudos.

Exemplos:

```text
/trilha Python
/trilha React
/trilha Java
/trilha AWS
```

O resultado apresenta informações como o nível da trilha, a quantidade de módulos, os pontos de experiência (XP) e uma sugestão de estudos dividida em três fases.

Exemplo simplificado:

```text
🎯 Plano de Estudos — Python

Tecnologia: Python
Nível: Básico
Módulos: 10
XP Total: 38.000

Fase 1 — Fundamentos
Aprender os conceitos básicos da linguagem.

Fase 2 — Intermediário
Praticar funções e integração entre recursos.

Fase 3 — Avançado
Conhecer conceitos mais avançados e
aplicar o conhecimento em projetos.
```

Os dados são fictícios e foram criados para demonstrar o funcionamento do projeto.

### ⚔️ 2. Gerar um desafio de programação

O comando `/desafio` cria um exercício de programação de acordo com a tecnologia e o nível escolhidos.

Exemplos:

```text
/desafio Python Básico
/desafio React Intermediário
/desafio Java Avançado
/desafio JavaScript
```

Os desafios possuem três níveis:

- **Básico:** 100 XP.
- **Intermediário:** 250 XP.
- **Avançado:** 500 XP.

Cada exercício pode apresentar um problema para resolver, requisitos, dicas e exemplos de entrada e saída.

O projeto possui desafios cadastrados para Python, Java, React e JavaScript. Quando não existe um desafio específico para a tecnologia escolhida, o sistema pode gerar uma opção genérica.

Essa funcionalidade foi uma forma de praticar a criação de regras e respostas usando TypeScript com o apoio do IBM Bob.

### 🏆 3. Gerar um certificado fictício

O comando `/certificado` gera um arquivo Markdown com os dados de uma pessoa e da trilha escolhida.

Exemplos:

```text
/certificado "João Silva" "Python"
/certificado "Maria Santos" "React"
/certificado "Pedro Oliveira" "Java"
```

O arquivo é salvo na pasta `docs/certificados-emitidos/` e recebe um código de verificação único.

Exemplo de resultado:

```text
✅ Certificado gerado com sucesso!

Parabéns, João Silva!

Trilha: Python
Código: DIO-2-2025-XKQM

Arquivo: cert_João_Silva_Python_...md
```

O certificado é apenas uma demonstração do funcionamento do sistema. Ele não representa uma certificação oficial da DIO ou de outra instituição.

---

## 🧪 Como executar os testes

Além de desenvolver as funcionalidades, também trabalhei com testes para verificar se os comandos estavam funcionando como esperado.

Na pasta `PRJ-IBM-BOB/geo_explorer`, execute:

```bash
npm test
```

Também é possível executar cada conjunto de testes separadamente:

```bash
npm run test:trilha
npm run test:desafio
npm run test:certificado
```

O projeto possui testes para verificar situações como:

- Busca por tecnologias com letras maiúsculas ou minúsculas.
- Tratamento de tecnologias não cadastradas.
- Geração de desafios por nível.
- Criação dos arquivos de certificado.
- Geração de códigos diferentes para certificados.
- Tratamento de entradas inválidas.

**Resultado esperado:** 43 testes aprovados e nenhum teste com falha, conforme a suíte de testes desenvolvida para o projeto.

---

## 🔧 Ferramentas disponíveis pelo MCP

Outra parte do aprendizado foi conhecer o MCP (*Model Context Protocol*).

De forma simples, o MCP permite que uma aplicação disponibilize ferramentas para que um assistente de IA possa utilizá-las de maneira organizada.

Neste projeto, criei quatro ferramentas:

| Ferramenta | Para que serve |
|---|---|
| `listar-trilhas` | Mostra as trilhas cadastradas. |
| `buscar-trilha` | Busca uma trilha e apresenta seu plano de estudos. |
| `gerar-desafio` | Cria um desafio de programação. |
| `emitir-certificado` | Gera um certificado fictício. |

Com o servidor configurado corretamente, o IBM Bob pode acessar essas ferramentas por meio do MCP.

---

## ✨ O que consegui melhorar no projeto

Durante o desenvolvimento, também fiz algumas melhorias para deixar o código mais organizado e o sistema mais completo.

**1. Organização dos tipos**

Criei um arquivo `types.ts` para reunir interfaces utilizadas em diferentes partes do código. Isso ajudou a evitar repetições.

**2. Desafios mais completos**

Em vez de trabalhar apenas com exercícios genéricos, organizei desafios com enunciados e níveis de dificuldade para algumas tecnologias.

**3. Comandos com nomes e espaços**

Ajustei o processamento dos comandos para aceitar nomes com espaços entre aspas, como no exemplo do certificado.

**4. Alternativa quando não há um desafio cadastrado**

Adicionei uma opção para gerar um desafio genérico quando a tecnologia não possui um exercício específico no banco de dados.

**5. Testes automatizados**

Criei uma suíte com 43 verificações para ajudar a encontrar problemas durante o desenvolvimento.

**6. Servidor MCP**

Implementei ferramentas para disponibilizar as funcionalidades do projeto ao IBM Bob.

**7. Cuidados com os arquivos**

Configurei o `.gitignore` para evitar o envio de dependências, arquivos de compilação, configurações locais e certificados gerados durante os testes.

Essas melhorias foram feitas enquanto eu explorava as possibilidades do IBM Bob e aprendia mais sobre programação com o auxílio da IA.

---

## 📖 O que aprendi com esse projeto

Como estou dando meus primeiros passos com o IBM Bob, este projeto foi uma oportunidade de aprender na prática, testar ideias e entender melhor como a IA pode ajudar no desenvolvimento de software.

### Sobre o IBM Bob

- Aprendi a criar comandos personalizados para executar tarefas específicas.
- Comecei a entender como orientar a IA para desenvolver funcionalidades a partir de instruções.
- Percebi a importância de explicar claramente o que espero de cada comando.
- Entendi que o código gerado pela IA precisa ser revisado e testado.

### Sobre o MCP

- Conheci o conceito de Model Context Protocol.
- Aprendi como disponibilizar funcionalidades de um projeto por meio de ferramentas.
- Entendi melhor como configurar um servidor MCP local para ser utilizado pelo IBM Bob.

### Sobre programação

- Pratiquei a organização de arquivos em TypeScript.
- Conheci melhor o uso de interfaces e a separação de responsabilidades.
- Trabalhei com testes automatizados.
- Aprendi um pouco mais sobre compilação, dependências e configuração de projetos Node.js.

### Sobre aprender com inteligência artificial

Uma das principais lições foi perceber que usar IA para programar não significa apenas pedir que ela escreva o código.

Também é importante explicar o objetivo, conferir o resultado, executar os testes e entender os erros que aparecem.

Como iniciante, sei que ainda tenho muito a aprender, mas desenvolver esse projeto me ajudou a dar mais um passo nessa jornada.

---

## 📊 Trilhas disponíveis

O sistema utiliza uma base de dados fictícia com 20 trilhas de aprendizagem.

| ID | Tecnologia | Nível | XP |
|---:|---|---|---:|
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

Os dados servem para simular uma plataforma de aprendizagem e não representam informações oficiais ou atuais sobre os cursos da DIO.

---

## 🔒 Cuidados antes de enviar o projeto para o GitHub

Durante o desenvolvimento, também aprendi que é importante prestar atenção aos arquivos que serão enviados para um repositório público.

Confira se os seguintes itens estão sendo ignorados pelo Git:

| Arquivo ou pasta | Motivo |
|---|---|
| `.bob/mcp.json` | Contém caminhos específicos do computador. |
| `node_modules/` | Contém dependências instaladas localmente. |
| `mcp/build/` | Contém arquivos gerados durante a compilação. |
| `.env` e `.env.*` | Podem conter informações secretas. |
| `docs/certificados-emitidos/` | Contém arquivos gerados localmente. |

Essas configurações estão previstas no `.gitignore` do projeto. Mesmo assim, vale conferir o que será enviado antes de executar um `git push`.

---

## 📜 Licença

MIT — projeto desenvolvido como parte dos estudos da formação IBM Bob IA de Nível Empresarial, da DIO.

---

*🚀 Um projeto de aprendizado, desenvolvido com a ajuda do IBM Bob e com muita vontade de aprender mais sobre programação e inteligência artificial.*
