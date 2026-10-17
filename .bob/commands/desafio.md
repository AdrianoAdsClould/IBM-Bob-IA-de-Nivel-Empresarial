---
description: Gera um desafio de código aleatório baseado no nível e tecnologia escolhidos
argument-hint: <tecnologia> <nivel>
---

Leia o arquivo `PRJ-IBM-BOB/data/trilhas.json` e encontre a trilha cuja `tecnologia` ou `nome` contenha **$1** (case-insensitive).

- **Tecnologia:** $1
- **Nível:** $2 (se não informado, use `Intermediário`)

Com base na trilha encontrada, gere e exiba no chat um desafio de código original:

---

## ⚔️ Desafio de Código — $1 | Nível: $2

| Campo | Valor |
|-------|-------|
| 📚 Trilha | {nome da trilha encontrada} |
| ⭐ XP do Desafio | {10% do xp_total da trilha} XP |
| 🏅 Badge Desbloqueável | {primeira badge relevante de badges_disponiveis} |

---

### 📋 Descrição do Desafio

Crie um problema real e contextualizado para **$1** no nível **$2**:
- **Básico**: algoritmo simples, manipulação de dados, funções fundamentais
- **Intermediário**: integração de conceitos, bibliotecas, padrões de projeto
- **Avançado**: arquitetura, performance, segurança, casos de uso em produção

---

### 📥 Entrada Esperada

Descreva o input que a função/programa deve receber, com 2 exemplos concretos.

---

### 📤 Saída Esperada

Descreva o output esperado com os 2 exemplos correspondentes de input → output.

---

### 💡 Dicas Progressivas

1. 🟢 **Dica 1 (leve):** conceito ou documentação a revisar
2. 🟡 **Dica 2 (média):** abordagem ou estrutura sugerida
3. 🔴 **Dica 3 (forte):** esboço do algoritmo sem entregar a solução

---

### ✅ Critérios de Avaliação

Liste 4 critérios que serão avaliados na solução (ex: eficiência, legibilidade, tratamento de erros, boas práticas da tecnologia).

---

### 🚀 Desafio Bônus (opcional)

Sugira uma extensão do desafio para quem quiser ir além do requisito mínimo.

---

Se **$1** não for encontrada no arquivo, liste todos os nomes de trilhas disponíveis e peça ao usuário para escolher.
