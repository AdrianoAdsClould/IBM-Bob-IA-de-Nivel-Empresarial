---
description: Gera um plano de estudos formatado a partir de uma tecnologia em data/trilhas.json
argument-hint: <tecnologia>
---

Leia o arquivo `IBM-Bob-IA-de-Nivel-Empresarial/PRJ-IBM-BOB/data/trilhas.json` e encontre a trilha cuja propriedade `tecnologia` ou `nome` contenha o termo **$1** (busca case-insensitive).

Com os dados encontrados, exiba no chat o seguinte plano de estudos:

---

## 📚 Plano de Estudos — {nome}

| Campo | Valor |
|-------|-------|
| 🖥️ Tecnologia | {tecnologia} |
| 📊 Nível | {nivel} |
| 📦 Total de Módulos | {numero_de_modulos} |
| ⭐ XP Total | {xp_total} XP |

---

### 🗓️ Cronograma de Módulos

Distribua os {numero_de_modulos} módulos em semanas (sugestão: 2 módulos/semana). Para cada módulo, crie:
- **Módulo N** — Título sugerido compatível com a tecnologia
- 🎯 Objetivo de aprendizado
- 📖 Recurso recomendado (tipo: artigo, vídeo ou projeto prático)

---

### 🏅 Badges Disponíveis

Para cada badge em `badges_disponiveis`, exiba com `🥇` e uma linha descrevendo o que ela representa.

---

### 🎯 Promoção Atual

- **Desconto:** {promocoes.desconto_percentual}%
- **Cupom:** `{promocoes.cupom}`
- **Válido até:** {promocoes.validade}
- **Acesso:** {se vitalicio for true: "✅ Vitalício" senão: "⏳ Por tempo limitado"}

---

### 📡 Próximas Lives ao Vivo

Para cada item em `lives_ao_vivo`, exiba:
- 📅 **{data} às {horario}** — {titulo}

---

Se a tecnologia **$1** não for encontrada no arquivo, liste todos os nomes de trilhas disponíveis e peça ao usuário para escolher uma.
