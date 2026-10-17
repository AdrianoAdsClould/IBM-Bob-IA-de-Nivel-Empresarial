#!/usr/bin/env node
/**
 * GEO-EXPLORER MCP Server
 *
 * Servidor MCP local (stdio) que expõe as ferramentas do GEO-EXPLORER
 * para o IBM Bob e outras ferramentas compatíveis com MCP.
 *
 * Ferramentas:
 *   - listar-trilhas     : lista todas as trilhas disponíveis
 *   - buscar-trilha      : busca trilha por tecnologia e retorna plano de estudos
 *   - gerar-desafio      : gera desafio de código por tecnologia e nível
 *   - emitir-certificado : emite certificado fictício de conclusão
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools.js';

const server = new McpServer({
  name: 'geo-explorer',
  version: '1.0.0',
});

registerTools(server);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🌍 GEO-EXPLORER MCP Server rodando em stdio');
}

main().catch(error => {
  console.error('Fatal error no GEO-EXPLORER MCP Server:', error);
  process.exit(1);
});

// Made with Bob
