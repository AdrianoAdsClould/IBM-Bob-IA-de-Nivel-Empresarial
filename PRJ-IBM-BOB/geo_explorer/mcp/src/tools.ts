import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  listarTodasTrilhas,
  buscarTrilhaPorTecnologia,
  gerarDesafioParaTrilha,
  gerarCodigoCertificado,
} from './services.js';
import { Trilha, Desafio } from './types.js';

type TextContent = { type: 'text'; text: string };
type ToolResponse = { content: TextContent[]; isError?: boolean };

function ok(text: string): ToolResponse {
  return { content: [{ type: 'text', text }] };
}
function fail(text: string): ToolResponse {
  return { content: [{ type: 'text', text }], isError: true };
}

export function registerTools(server: McpServer): void {
  // ─── LISTAR TRILHAS ────────────────────────────────────────────────────────
  server.registerTool(
    'listar-trilhas',
    {
      description: 'Lista todas as trilhas de aprendizagem disponíveis no GEO-EXPLORER',
      inputSchema: z.object({}),
    },
    async (): Promise<ToolResponse> => {
      try {
        const trilhas = listarTodasTrilhas();
        const lista = trilhas
          .map((t: Trilha) =>
            `- [${t.id}] **${t.nome}** | ${t.tecnologia} | ${t.nivel} | ${t.xpTotal.toLocaleString('pt-BR')} XP`
          )
          .join('\n');
        return ok(`# 📚 Trilhas Disponíveis — GEO-EXPLORER\n\n${lista}\n\nTotal: **${trilhas.length}** trilhas`);
      } catch (e) {
        return fail(`Erro ao listar trilhas: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  );

  // ─── BUSCAR TRILHA ─────────────────────────────────────────────────────────
  server.registerTool(
    'buscar-trilha',
    {
      description: 'Busca trilhas por tecnologia e retorna o plano de estudos completo',
      inputSchema: z.object({
        tecnologia: z.string().describe('Nome da tecnologia (ex: Python, React, Java)'),
      }),
    },
    async ({ tecnologia }): Promise<ToolResponse> => {
      try {
        const encontradas = buscarTrilhaPorTecnologia(tecnologia);
        if (encontradas.length === 0) {
          const todas = listarTodasTrilhas().map((t: Trilha) => t.tecnologia).join(', ');
          return fail(`Nenhuma trilha encontrada para "${tecnologia}".\n\nDisponíveis: ${todas}`);
        }
        const t = encontradas[0];
        const f1 = Math.ceil(t.numeroModulos / 3);
        const f2 = Math.ceil((t.numeroModulos * 2) / 3);
        let out = `# 🎯 ${t.nome}\n\n`;
        out += `- **Tecnologia:** ${t.tecnologia}\n`;
        out += `- **Nível:** ${t.nivel}\n`;
        out += `- **Módulos:** ${t.numeroModulos}\n`;
        out += `- **XP Total:** ${t.xpTotal.toLocaleString('pt-BR')}\n`;
        out += `- **Vitalício:** ${t.vitalicio ? 'Sim' : 'Não'}\n\n`;
        out += `## Badges\n${t.badgesDisponiveis.map((b: string) => `- ${b}`).join('\n')}\n\n`;
        out += `## Plano de Estudos\n`;
        out += `- **Fase 1 (Módulos 1–${f1}):** Fundamentos e primeiros projetos\n`;
        out += `- **Fase 2 (Módulos ${f1 + 1}–${f2}):** Padrões e integração\n`;
        out += `- **Fase 3 (Módulos ${f2 + 1}–${t.numeroModulos}):** Arquitetura e produção\n`;
        return ok(out);
      } catch (e) {
        return fail(`Erro: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  );

  // ─── GERAR DESAFIO ─────────────────────────────────────────────────────────
  server.registerTool(
    'gerar-desafio',
    {
      description: 'Gera um desafio de código para uma tecnologia e nível específicos',
      inputSchema: z.object({
        tecnologia: z.string().describe('Nome da tecnologia'),
        nivel: z
          .enum(['Básico', 'Intermediário', 'Avançado'])
          .default('Intermediário')
          .describe('Nível de dificuldade'),
      }),
    },
    async ({ tecnologia, nivel }): Promise<ToolResponse> => {
      try {
        const encontradas = buscarTrilhaPorTecnologia(tecnologia);
        if (encontradas.length === 0) {
          return fail(`Tecnologia "${tecnologia}" não encontrada.`);
        }
        const desafio: Desafio = gerarDesafioParaTrilha(encontradas[0], nivel);
        let out = `# ⚔️ ${desafio.titulo}\n\n`;
        out += `**Dificuldade:** ${desafio.dificuldade} | **XP:** ${desafio.pontos}\n\n`;
        out += `## Descrição\n${desafio.descricao}\n\n`;
        out += `## Requisitos\n${desafio.requisitos.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n')}\n\n`;
        out += `## Dicas\n${desafio.dicas.map((d: string) => `- ${d}`).join('\n')}\n\n`;
        out += `## Exemplos\n${desafio.exemplos.map((ex: { entrada: string; saida: string }) => `**Entrada:** ${ex.entrada}\n**Saída:** ${ex.saida}`).join('\n\n')}`;
        return ok(out);
      } catch (e) {
        return fail(`Erro: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  );

  // ─── EMITIR CERTIFICADO ────────────────────────────────────────────────────
  server.registerTool(
    'emitir-certificado',
    {
      description: 'Emite um certificado fictício de conclusão de trilha',
      inputSchema: z.object({
        nomeUsuario: z.string().describe('Nome completo do estudante'),
        tecnologia: z.string().describe('Tecnologia da trilha concluída'),
      }),
    },
    async ({ nomeUsuario, tecnologia }): Promise<ToolResponse> => {
      try {
        if (!nomeUsuario.trim()) return fail('Nome do usuário é obrigatório.');
        const encontradas = buscarTrilhaPorTecnologia(tecnologia);
        if (encontradas.length === 0) return fail(`Tecnologia "${tecnologia}" não encontrada.`);
        const t = encontradas[0];
        const codigo = gerarCodigoCertificado(t.id);
        const hoje = new Date().toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        let cert = `# 🎓 CERTIFICADO DE CONCLUSÃO\n\n`;
        cert += `## Digital Innovation One\n\n`;
        cert += `Certificamos que **${nomeUsuario.toUpperCase()}** concluiu com êxito a formação\n\n`;
        cert += `## **${t.nome}**\n\n`;
        cert += `| Campo | Detalhes |\n|-------|----------|\n`;
        cert += `| Tecnologia | ${t.tecnologia} |\n`;
        cert += `| Nível | ${t.nivel} |\n`;
        cert += `| Módulos | ${t.numeroModulos} |\n`;
        cert += `| XP | ${t.xpTotal.toLocaleString('pt-BR')} |\n`;
        cert += `| Data | ${hoje} |\n`;
        cert += `| Código | \`${codigo}\` |\n\n`;
        cert += `Verifique em: https://dio.me/certificados/${codigo}`;
        return ok(cert);
      } catch (e) {
        return fail(`Erro: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  );
}

// Made with Bob
