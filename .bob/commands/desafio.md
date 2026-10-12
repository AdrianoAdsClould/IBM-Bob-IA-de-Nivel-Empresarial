---
description: Gera um desafio de código aleatório baseado no nível e tecnologia escolhidos pelo usuário
argument-hint: <tecnologia> <nivel>
---

O usuário quer um desafio de código. Argumentos recebidos: **$ARGUMENTS**

Extraia do argumento:
- **Tecnologia**: primeira palavra ou termo reconhecível como tecnologia (ex: Java, Python, React, SQL...)
- **Nível**: Básico, Intermediário ou Avançado (se não informado, use Intermediário)

Siga exatamente estes passos:

1. Leia o arquivo `PRJ-IBM-BOB/data/trilhas.json` e localize a trilha correspondente à tecnologia e nível informados.
2. Com base na tecnologia e nível encontrados, gere um desafio de código original, criativo e educativo.
3. Formate e exiba o desafio no seguinte padrão:

---

## ⚔️ Desafio de Código — {tecnologia} | Nível: {nivel}

**Trilha relacionada:** {nome da trilha encontrada no JSON}
**XP ao completar este desafio:** (calcule 10% do xp_total da trilha)
**Badge desbloqueável:** (escolha uma badge relevante da trilha)

---

### 📋 Descrição do Desafio

Descreva um problema real e contextualizado para a tecnologia escolhida. O desafio deve ser:
- **Básico**: algorítmico simples, manipulação de dados, funções básicas
- **Intermediário**: integração de conceitos, uso de bibliotecas, padrões de projeto
- **Avançado**: arquitetura, performance, segurança, casos de uso em produção

---

### 📥 Entrada Esperada

Descreva claramente qual entrada o programa/função deve receber (com exemplos concretos).

---

### 📤 Saída Esperada

Descreva o resultado esperado com pelo menos 2 exemplos de input/output.

---

### 💡 Dicas

Forneça 3 dicas progressivas (sem entregar a solução):
1. Dica leve (conceito a revisar)
2. Dica média (abordagem sugerida)
3. Dica forte (estrutura do algoritmo)

---

### ✅ Critérios de Avaliação

Liste 4 critérios que serão avaliados na solução (ex: eficiência, legibilidade, tratamento de erros, boas práticas).

---

### 🚀 Bônus (opcional)

Sugira uma extensão do desafio para quem quiser ir além.

---

Se a tecnologia não for encontrada no JSON, informe as disponíveis e peça para o usuário escolher uma.
