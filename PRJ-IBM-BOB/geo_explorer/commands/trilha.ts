import * as fs from 'fs';
import * as path from 'path';
import { Trilha, TrilhasData } from './types';

export function carregarTrilhas(): TrilhasData {
  const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as TrilhasData;
}

export function buscarTrilhas(tecnologia: string): Trilha[] {
  const { trilhas } = carregarTrilhas();
  return trilhas.filter(
    t =>
      t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase()) ||
      t.nome.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

export function executarComandoTrilha(tecnologia: string): string {
  if (!tecnologia) {
    return (
      '❌ Por favor, especifique uma tecnologia.\n\n' +
      '**Uso:** `/trilha <tecnologia>`\n\n' +
      '**Exemplo:** `/trilha Python`'
    );
  }

  const encontradas = buscarTrilhas(tecnologia);

  if (encontradas.length === 0) {
    const { trilhas } = carregarTrilhas();
    const lista = trilhas.map(t => `- **${t.tecnologia}** — ${t.nome}`).join('\n');
    return `❌ Nenhuma trilha encontrada para: **${tecnologia}**\n\n💡 **Trilhas disponíveis:**\n\n${lista}`;
  }

  let out = `# 🎯 Plano de Estudos — ${tecnologia}\n\n`;
  out += `📚 **${encontradas.length} trilha(s) encontrada(s)**\n\n---\n\n`;

  encontradas.forEach((t, idx) => {
    out += `## ${idx + 1}. ${t.nome}\n\n`;
    out += `### 📊 Informações Gerais\n`;
    out += `- **Tecnologia:** ${t.tecnologia}\n`;
    out += `- **Nível:** ${t.nivel}\n`;
    out += `- **Módulos:** ${t.numeroModulos}\n`;
    out += `- **XP Total:** ${t.xpTotal.toLocaleString('pt-BR')} pontos\n`;
    out += `- **Acesso Vitalício:** ${t.vitalicio ? '✅ Sim' : '❌ Não'}\n\n`;

    out += `### 🏆 Badges Disponíveis\n`;
    t.badgesDisponiveis.forEach(b => { out += `- 🎖️ ${b}\n`; });
    out += `\n`;

    if (t.livesAoVivo.length > 0) {
      out += `### 🎥 Lives ao Vivo\n`;
      t.livesAoVivo.forEach(l => { out += `- 📺 ${l}\n`; });
      out += `\n`;
    }

    if (t.promocoes.length > 0) {
      out += `### 🎁 Promoções Ativas\n`;
      t.promocoes.forEach(p => { out += `- 🔥 ${p}\n`; });
      out += `\n`;
    }

    const f1 = Math.ceil(t.numeroModulos / 3);
    const f2 = Math.ceil((t.numeroModulos * 2) / 3);

    out += `### 📝 Plano de Estudos Sugerido\n\n`;
    out += `#### Fase 1 — Fundamentos (Módulos 1–${f1})\n`;
    out += `- Conceitos básicos e sintaxe da tecnologia\n`;
    out += `- Estruturas de dados fundamentais\n`;
    out += `- Primeiros projetos práticos\n`;
    out += `- **Tempo estimado:** ${f1} semanas\n\n`;

    out += `#### Fase 2 — Intermediário (Módulos ${f1 + 1}–${f2})\n`;
    out += `- Conceitos avançados e padrões de projeto\n`;
    out += `- Integração com bibliotecas e frameworks\n`;
    out += `- Desenvolvimento de aplicações completas\n`;
    out += `- **Tempo estimado:** ${f1} semanas\n\n`;

    out += `#### Fase 3 — Avançado (Módulos ${f2 + 1}–${t.numeroModulos})\n`;
    out += `- Arquitetura, performance e boas práticas\n`;
    out += `- Casos de uso em produção\n`;
    out += `- Projeto final integrador\n`;
    out += `- **Tempo estimado:** ${t.numeroModulos - f2} semanas\n\n`;

    out += `### 🎯 Próximos Passos\n`;
    out += `1. Inscreva-se na formação na plataforma DIO\n`;
    out += `2. Configure seu ambiente de desenvolvimento\n`;
    out += `3. Participe das lives ao vivo\n`;
    out += `4. Pratique com \`/desafio ${tecnologia} Básico\`\n`;
    out += `5. Conclua e emita seu certificado com \`/certificado "Seu Nome" "${tecnologia}"\`\n\n`;

    if (idx < encontradas.length - 1) out += `---\n\n`;
  });

  return out;
}

// Made with Bob
