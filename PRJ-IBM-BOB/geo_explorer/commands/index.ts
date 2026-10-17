/**
 * GEO-EXPLORER — DIO | IBM Bob
 *
 * Roteador central de comandos slash.
 *
 * Comandos disponíveis:
 *   /trilha <tecnologia>
 *   /desafio <tecnologia> [nivel]
 *   /certificado "<nome>" "<tecnologia>"
 *   /help
 */

import { executarComandoTrilha } from './trilha';
import { executarComandoDesafio } from './desafio';
import { executarComandoCertificado } from './certificado';

interface SlashCommand {
  name: string;
  description: string;
  usage: string;
  examples: string[];
  handler: (...args: string[]) => string;
}

export const slashCommands: Record<string, SlashCommand> = {
  trilha: {
    name: 'trilha',
    description: 'Exibe o plano de estudos detalhado de uma trilha/tecnologia',
    usage: '/trilha <tecnologia>',
    examples: ['/trilha Python', '/trilha JavaScript', '/trilha React', '/trilha Java'],
    handler: (tecnologia: string) => executarComandoTrilha(tecnologia ?? ''),
  },

  desafio: {
    name: 'desafio',
    description: 'Gera um desafio de código conforme tecnologia e nível escolhidos',
    usage: '/desafio <tecnologia> [nivel]',
    examples: [
      '/desafio Python',
      '/desafio JavaScript Básico',
      '/desafio Java Intermediário',
      '/desafio React Avançado',
    ],
    handler: (tecnologia: string, nivel?: string) =>
      executarComandoDesafio(tecnologia ?? '', nivel),
  },

  certificado: {
    name: 'certificado',
    description: 'Gera um certificado fictício de conclusão em Markdown',
    usage: '/certificado "<nome>" "<tecnologia>"',
    examples: [
      '/certificado "João Silva" "Python"',
      '/certificado "Maria Santos" "JavaScript"',
      '/certificado "Pedro Oliveira" "Java"',
    ],
    handler: (nome: string, tecnologia?: string) => {
      // Suporta args já separados ou embutidos em uma única string com aspas
      if (tecnologia) return executarComandoCertificado(nome, tecnologia);

      const partes = (nome ?? '').split('"').map(s => s.trim()).filter(Boolean);
      if (partes.length >= 2) return executarComandoCertificado(partes[0], partes[1]);

      return (
        '❌ Por favor, forneça nome e tecnologia.\n\n' +
        '**Uso:** `/certificado "<nome>" "<tecnologia>"`\n\n' +
        '**Exemplo:** `/certificado "João Silva" "Python"`'
      );
    },
  },
};

function gerarHelp(): string {
  let h = '# 📚 GEO-EXPLORER — Comandos Disponíveis\n\n';
  h += 'Sistema de exploração de trilhas de aprendizagem DIO × IBM Bob.\n\n---\n\n';
  for (const cmd of Object.values(slashCommands)) {
    h += `## /${cmd.name}\n\n**${cmd.description}**\n\n`;
    h += `**Uso:** \`${cmd.usage}\`\n\n**Exemplos:**\n`;
    cmd.examples.forEach(e => { h += `- \`${e}\`\n`; });
    h += `\n---\n\n`;
  }
  h += '## 💡 Dicas\n\n';
  h += '- Argumentos com espaços devem vir entre aspas duplas\n';
  h += '- Os comandos são case-insensitive\n';
  h += '- Use `/help` a qualquer momento para ver esta lista\n';
  return h;
}

export function processarComando(input: string): string {
  const trimmed = input?.trim() ?? '';

  if (!trimmed.startsWith('/')) {
    return '❌ Comandos devem começar com `/`\n\nUse `/help` para ver os comandos disponíveis.';
  }

  // Tokeniza respeitando aspas: /cmd "arg com espaço" argSimples
  const regex = /[^\s"]+|"([^"]*)"/gi;
  const partes: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(trimmed.slice(1))) !== null) {
    partes.push(m[1] !== undefined ? m[1] : m[0]);
  }

  const cmd = partes[0]?.toLowerCase();
  const args = partes.slice(1);

  if (cmd === 'help') return gerarHelp();

  const command = slashCommands[cmd];
  if (!command) {
    return `❌ Comando desconhecido: \`/${cmd}\`\n\nUse \`/help\` para ver os comandos disponíveis.`;
  }

  try {
    return command.handler(...args);
  } catch (err) {
    return `❌ Erro ao executar \`/${cmd}\`: ${err instanceof Error ? err.message : String(err)}`;
  }
}

export { executarComandoTrilha, executarComandoDesafio, executarComandoCertificado };
export default processarComando;

// Made with Bob
