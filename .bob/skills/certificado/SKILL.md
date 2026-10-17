---
name: certificado
description: >-
  Gera um certificado fictício em markdown com o nome do usuário e a trilha
  concluída
metadata:
  user-invocable: true
  disable-model-invocation: true
  argument-hint: <seu-nome> <trilha>
---

Leia o arquivo `IBM-Bob-IA-de-Nivel-Empresarial/PRJ-IBM-BOB/data/trilhas.json` e encontre a trilha cuja `tecnologia` ou `nome` contenha **$2** (case-insensitive).

- **Nome do usuário:** $1
- **Trilha concluída:** $2

Com os dados encontrados, gere e exiba no chat o certificado completo abaixo:

---

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           🏆  CERTIFICADO DE CONCLUSÃO  🏆                  ║
║                                                              ║
║                 DIO — Digital Innovation One                 ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 📜 Certificado de Conclusão

**Este certificado é concedido a:**

# $1

**pela conclusão com êxito da trilha:**

## {nome da trilha encontrada no JSON}

---

| Campo | Detalhes |
|-------|----------|
| 🖥️ Tecnologia | {tecnologia} |
| 📊 Nível | {nivel} |
| 📦 Módulos Concluídos | {numero_de_modulos} de {numero_de_modulos} |
| ⭐ XP Conquistado | {xp_total} XP |
| 🏅 Badge Principal | {última badge de badges_disponiveis} |
| 📅 Data de Emissão | {data atual no formato DD/MM/AAAA} |
| 🔑 Código do Certificado | DIO-{id}-{ano atual}-{4 letras aleatórias maiúsculas} |

---

### 🏅 Badges Conquistadas

Liste cada badge de `badges_disponiveis` precedida de `🥇`.

---

### 💬 Parabéns, $1!

Escreva uma mensagem motivacional de 3 linhas: parabenize pelo nome, mencione a tecnologia aprendida e encoraje os próximos passos na carreira tech.

---

### 🔗 Verificação de Autenticidade

> Certificado gerado pela plataforma **DIO** em parceria com **IBM Bob IA**.
> Verifique em: `https://web.dio.me/certificate/{código do certificado}`

---

*Gerado automaticamente pelo comando `/certificado` — IBM Bob IA de Nível Empresarial*

---

Se **$2** não for encontrada no arquivo, liste todos os nomes de trilhas disponíveis e peça ao usuário para escolher.
