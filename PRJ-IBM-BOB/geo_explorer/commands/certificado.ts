import * as fs from 'fs';
import * as path from 'path';
import { TrilhasData } from './types';
import { buscarTrilhas } from './trilha';

function gerarDataAtual(): string {
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  const d = new Date();
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

function gerarCodigo(id: number): string {
  const alfa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const sufixo = Array.from({ length: 4 }, () => alfa[Math.floor(Math.random() * 26)]).join('');
  return `DIO-${id}-${new Date().getFullYear()}-${sufixo}`;
}

export function executarComandoCertificado(nomeUsuario: string, tecnologia: string): string {
  if (!nomeUsuario?.trim()) {
    return (
      '❌ Por favor, forneça seu nome.\n\n' +
      '**Uso correto:** `/certificado "Seu Nome" "Tecnologia"`\n\n' +
      '**Exemplo:** `/certificado "João Silva" "Python"`'
    );
  }

  const encontradas = buscarTrilhas(tecnologia);

  if (encontradas.length === 0) {
    try {
      const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
      const raw = fs.readFileSync(dataPath, 'utf-8');
      const { trilhas } = JSON.parse(raw) as TrilhasData;
      const lista = trilhas.map(t => `- **${t.tecnologia}** — ${t.nome}`).join('\n');
      return `❌ Trilha não encontrada para: **${tecnologia}**\n\n💡 **Trilhas disponíveis:**\n\n${lista}`;
    } catch {
      return `❌ Trilha não encontrada para: **${tecnologia}**`;
    }
  }

  const trilha = encontradas[0];
  const dataEmissao = gerarDataAtual();
  const codigo = gerarCodigo(trilha.id);
  const cargaHoraria = (trilha.numeroModulos * 2.5).toFixed(0);

  // Salvar o arquivo .md do certificado
  const certDir = path.join(__dirname, '../docs/certificados-emitidos');
  if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

  const nomeArq = `cert_${nomeUsuario.replace(/\s+/g, '_')}_${trilha.tecnologia}_${Date.now()}.md`;
  const certPath = path.join(certDir, nomeArq);

  const certMd = [
    `---`,
    `title: Certificado de Conclusão`,
    `student: ${nomeUsuario}`,
    `course: ${trilha.nome}`,
    `technology: ${trilha.tecnologia}`,
    `date: ${dataEmissao}`,
    `code: ${codigo}`,
    `---`,
    ``,
    `<div align="center">`,
    ``,
    `# 🎓 CERTIFICADO DE CONCLUSÃO`,
    ``,
    `## Digital Innovation One`,
    `### Plataforma de Educação em Tecnologia`,
    ``,
    `---`,
    ``,
    `## Certificamos que`,
    ``,
    `# **${nomeUsuario.toUpperCase()}**`,
    ``,
    `concluiu com êxito a formação`,
    ``,
    `## **${trilha.nome}**`,
    ``,
    `</div>`,
    ``,
    `---`,
    ``,
    `### 📊 Detalhes da Formação`,
    ``,
    `| Campo | Detalhes |`,
    `|-------|----------|`,
    `| **Tecnologia** | ${trilha.tecnologia} |`,
    `| **Nível** | ${trilha.nivel} |`,
    `| **Módulos Concluídos** | ${trilha.numeroModulos} |`,
    `| **Carga Horária** | ${cargaHoraria} horas |`,
    `| **XP Conquistado** | ${trilha.xpTotal.toLocaleString('pt-BR')} pontos |`,
    `| **Data de Emissão** | ${dataEmissao} |`,
    `| **Código do Certificado** | \`${codigo}\` |`,
    ``,
    `---`,
    ``,
    `### 🏆 Competências Desenvolvidas`,
    ``,
    ...trilha.badgesDisponiveis.map((b, i) => `${i + 1}. **${b}**`),
    ``,
    `---`,
    ``,
    `### 🎯 Conquistas`,
    ``,
    `- ✅ Completou ${trilha.numeroModulos} módulos de aprendizado`,
    `- ✅ Participou de ${trilha.livesAoVivo.length} lives ao vivo`,
    `- ✅ Conquistou ${trilha.badgesDisponiveis.length} badges`,
    `- ✅ Acumulou ${trilha.xpTotal.toLocaleString('pt-BR')} XP`,
    ``,
    `---`,
    ``,
    `<div align="center">`,
    ``,
    `### 📜 Verificação`,
    ``,
    `\`\`\``,
    codigo,
    `\`\`\``,
    ``,
    `*Verifique em: https://dio.me/certificados/${codigo}*`,
    ``,
    `**Emitido em:** ${dataEmissao}`,
    ``,
    `🎊 **Parabéns pela conquista, ${nomeUsuario}!**`,
    ``,
    `</div>`,
  ].join('\n');

  fs.writeFileSync(certPath, certMd, 'utf-8');

  // Saída no chat
  let out = `# ✅ Certificado Gerado com Sucesso!\n\n`;
  out += `🎉 **Parabéns, ${nomeUsuario}!**\n\n`;
  out += `O certificado para **${trilha.nome}** foi emitido.\n\n---\n\n`;
  out += `### 📄 Resumo\n\n`;
  out += `| Campo | Detalhes |\n|-------|----------|\n`;
  out += `| **Aluno** | ${nomeUsuario} |\n`;
  out += `| **Formação** | ${trilha.nome} |\n`;
  out += `| **Tecnologia** | ${trilha.tecnologia} |\n`;
  out += `| **Nível** | ${trilha.nivel} |\n`;
  out += `| **Carga Horária** | ${cargaHoraria} horas |\n`;
  out += `| **XP Conquistado** | ${trilha.xpTotal.toLocaleString('pt-BR')} pontos |\n`;
  out += `| **Data de Emissão** | ${dataEmissao} |\n`;
  out += `| **Código** | \`${codigo}\` |\n\n---\n\n`;
  out += `### 💾 Arquivo Salvo\n\n📁 \`${certPath}\`\n\n---\n\n`;
  out += `### 🏅 Badges Conquistadas\n\n`;
  trilha.badgesDisponiveis.forEach(b => { out += `- 🎖️ ${b}\n`; });
  out += `\n**Total de XP:** ${trilha.xpTotal.toLocaleString('pt-BR')} pontos 🚀\n\n---\n\n`;
  out += `🔗 Verifique em: https://dio.me/certificados/${codigo}\n\n`;
  out += `Continue sua jornada: use \`/trilha <tecnologia>\` para explorar novas formações!`;

  return out;
}

// Made with Bob
