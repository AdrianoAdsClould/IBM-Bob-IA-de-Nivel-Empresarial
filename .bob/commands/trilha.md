---
description: Gera um plano de estudos formatado a partir de uma tecnologia presente em data/trilhas.json
argument-hint: <tecnologia>
---

O usuário quer um plano de estudos para a tecnologia: **$ARGUMENTS**

Siga exatamente estes passos:

1. Leia o arquivo `PRJ-IBM-BOB/data/trilhas.json` do repositório atual.
2. Busque a trilha cuja propriedade `tecnologia` contenha (case-insensitive) o termo informado em `$ARGUMENTS`. Se não encontrar correspondência exata, busque pelo `nome` da trilha.
3. Com os dados encontrados, formate e exiba o seguinte plano de estudos no chat:

---

## 📚 Plano de Estudos — {nome da trilha}

**Tecnologia:** {tecnologia}
**Nível:** {nivel}
**Total de Módulos:** {numero_de_modulos}
**XP Total ao Concluir:** {xp_total} XP

---

### 🗓️ Cronograma de Módulos

Distribua os {numero_de_modulos} módulos em semanas (2 módulos por semana), sugerindo temas progressivos coerentes com a tecnologia escolhida. Liste cada módulo com:
- Número do módulo
- Título sugerido
- Objetivo de aprendizado
- Recurso recomendado (artigo, vídeo, prática)

---

### 🏅 Badges Disponíveis

Liste todas as badges de `badges_disponiveis` com uma breve descrição do que cada uma representa.

---

### 🎯 Promoção Atual

Exiba o desconto, cupom e validade da promoção da trilha.
Informe se é **vitalício** ou possui prazo de acesso.

---

### 📡 Próximas Lives ao Vivo

Liste todas as lives de `lives_ao_vivo` com título, data e horário formatados.

---

Se a tecnologia informada não for encontrada no arquivo, informe quais tecnologias estão disponíveis listando todos os `nome` das trilhas do JSON.
