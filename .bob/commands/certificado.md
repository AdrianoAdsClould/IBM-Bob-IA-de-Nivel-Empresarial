---
description: Gera um certificado fictício em markdown com o nome do usuário e a trilha concluída
argument-hint: <seu-nome> <nome-da-trilha>
---

O usuário quer gerar um certificado. Argumentos recebidos: **$ARGUMENTS**

Extraia do argumento:
- **Nome do usuário**: primeiro(s) token(s) que representam um nome próprio
- **Trilha concluída**: restante do argumento (nome ou tecnologia da trilha)

Siga exatamente estes passos:

1. Leia o arquivo `PRJ-IBM-BOB/data/trilhas.json` e localize a trilha pelo nome ou tecnologia informada.
2. Com os dados encontrados, gere e exiba no chat o certificado completo no seguinte formato markdown:

---

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║              🏆  CERTIFICADO DE CONCLUSÃO  🏆                   ║
║                                                                  ║
║                     DIO — Digital Innovation One                 ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 📜 Certificado de Conclusão

**Este certificado é concedido a:**

# {NOME DO USUÁRIO EM MAIÚSCULAS}

**pela conclusão com êxito da trilha:**

## {nome da trilha}

---

| Campo | Detalhes |
|-------|----------|
| 🖥️ Tecnologia | {tecnologia} |
| 📊 Nível | {nivel} |
| 📦 Módulos Concluídos | {numero_de_modulos} de {numero_de_modulos} |
| ⭐ XP Conquistado | {xp_total} XP |
| 🏅 Badge Principal | {última badge de badges_disponiveis} |
| 📅 Data de Emissão | {data atual no formato DD/MM/AAAA} |
| 🔑 Código do Certificado | DIO-{id da trilha}-{ano atual}-{4 caracteres aleatórios em maiúsculas} |

---

### 🏅 Badges Conquistadas

{liste todas as badges_disponiveis com emoji de medalha na frente de cada uma}

---

### 💬 Mensagem de Parabéns

Escreva uma mensagem motivacional personalizada de 3 linhas parabenizando o usuário pelo nome, mencionando a tecnologia aprendida e encorajando os próximos passos na carreira tech.

---

### 🔗 Verificação

> Este certificado foi gerado pela plataforma **DIO** em parceria com **IBM Bob IA**.
> Para verificar a autenticidade, acesse: `https://web.dio.me/certificate/{código do certificado}`

---

*Gerado automaticamente pelo slash command `/certificado` do IBM Bob IA de Nível Empresarial*

---

Se a trilha não for encontrada no JSON, liste todas as trilhas disponíveis e peça para o usuário escolher uma.
