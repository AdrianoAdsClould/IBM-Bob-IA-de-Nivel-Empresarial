import * as fs from 'fs';
import * as path from 'path';
import { Desafio, TrilhasData } from './types';
import { buscarTrilhas } from './trilha';

const BANCO_DESAFIOS: Record<string, Desafio[]> = {
  Python: [
    {
      titulo: 'Calculadora de Fibonacci com Memoization',
      descricao:
        'Implemente uma função que retorne o n-ésimo número de Fibonacci. Use memoization para garantir eficiência em entradas grandes.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: [
        'Função que recebe inteiro n e retorna F(n)',
        'Implementar cache para evitar recálculos',
        'Tratar entradas inválidas (n < 0)',
        'Complexidade de tempo O(n)',
      ],
      dicas: [
        'Use um dicionário como cache: `memo = {}`',
        'Caso base: F(0)=0, F(1)=1',
        'Verifique se o resultado já está no cache antes de calcular',
      ],
      exemplos: [
        { entrada: 'fibonacci(7)', saida: '13' },
        { entrada: 'fibonacci(10)', saida: '55' },
      ],
    },
    {
      titulo: 'Analisador de Logs CSV',
      descricao:
        'Leia um arquivo CSV de logs de servidor e calcule: total de requisições, média de tempo de resposta e top-5 endpoints mais acessados.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: [
        'Leitura e parsing de CSV com biblioteca padrão ou pandas',
        'Cálculo de média, máximo e mínimo de tempo de resposta',
        'Ranking dos 5 endpoints mais acessados',
        'Tratamento de linhas malformadas',
        'Exportar relatório em txt ou json',
      ],
      dicas: [
        'Use `csv.DictReader` para acesso por nome de coluna',
        '`collections.Counter` facilita contagem de frequências',
        'Valide tipos antes de calcular (int/float)',
      ],
      exemplos: [
        { entrada: 'logs.csv com 1000 linhas', saida: 'Relatório: 1000 reqs, média 120ms, top: /api/users' },
      ],
    },
    {
      titulo: 'Motor de Busca Semântica com TF-IDF',
      descricao:
        'Construa um motor de busca simples usando TF-IDF para ranquear documentos por relevância em relação a uma query.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: [
        'Tokenização e remoção de stopwords',
        'Cálculo correto de TF-IDF por documento',
        'Similaridade de cosseno entre query e documentos',
        'API Flask com endpoint POST /search',
        'Testes unitários para funções de cálculo',
      ],
      dicas: [
        'TF = freq_termo / total_termos_doc',
        'IDF = log(N / docs_com_termo)',
        'Use scikit-learn só para validar — implemente do zero',
      ],
      exemplos: [
        { entrada: 'query: "machine learning python"', saida: 'Rank: [doc3, doc1, doc7] com scores [0.87, 0.72, 0.61]' },
      ],
    },
  ],
  Java: [
    {
      titulo: 'Sistema Bancário com POO',
      descricao:
        'Modele um banco com contas corrente e poupança, suportando depósito, saque e transferência com validação de saldo.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: [
        'Classes abstratas Conta, ContaCorrente, ContaPoupança',
        'Depósito, saque e transferência entre contas',
        'Exceção customizada SaldoInsuficienteException',
        'Histórico de transações (lista de string)',
      ],
      dicas: [
        'Use herança e polimorfismo para os tipos de conta',
        'Encapsule o saldo com getter e nenhum setter direto',
        'Lance exceção checked para saldo insuficiente',
      ],
      exemplos: [
        { entrada: 'conta.depositar(500); conta.sacar(200)', saida: 'Saldo: R$ 300,00' },
        { entrada: 'conta.sacar(400)', saida: 'SaldoInsuficienteException: saldo R$ 300,00' },
      ],
    },
    {
      titulo: 'API REST de Produtos com Spring Boot',
      descricao:
        'Crie uma API CRUD para gerenciamento de produtos com paginação, validação de campos e documentação via Swagger.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: [
        'Endpoints GET, POST, PUT, DELETE para /produtos',
        'Validação com Bean Validation (@NotBlank, @Positive)',
        'Paginação via Pageable',
        'Tratamento global de erros com @ControllerAdvice',
        'Swagger/OpenAPI 3 configurado',
      ],
      dicas: [
        'Use Spring Data JPA com H2 em memória para simplificar',
        'ResponseEntity<> para controlar status HTTP',
        'Separe entidade JPA de DTO de resposta',
      ],
      exemplos: [
        { entrada: 'GET /produtos?page=0&size=5', saida: 'JSON com page, totalElements, content[]' },
      ],
    },
    {
      titulo: 'Microsserviços com Spring Cloud',
      descricao:
        'Implemente dois microsserviços (Pedidos e Pagamentos) comunicando-se via Feign, com Eureka e circuit breaker Resilience4j.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: [
        'Eureka Server + dois microsserviços registrados',
        'Feign Client para comunicação síncrona',
        'Circuit breaker com fallback no Resilience4j',
        'API Gateway com Spring Cloud Gateway',
        'Health check e métricas via Actuator',
      ],
      dicas: [
        'Inicie com Eureka Server antes dos serviços',
        'Configure timeouts no Feign para acionar o circuit breaker',
        'Use @FeignClient(name="pagamento-service")',
      ],
      exemplos: [
        { entrada: 'POST /pedidos com pagamento indisponível', saida: 'Resposta de fallback: { status: "PENDENTE" }' },
      ],
    },
  ],
  React: [
    {
      titulo: 'Contador com Hooks e Persistência',
      descricao: 'Crie um contador com incremento, decremento, reset e passo configurável. Persista o estado no localStorage.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: [
        'useState para valor e passo',
        'useEffect para sincronizar com localStorage',
        'Botões: +, −, Reset e input de passo',
        'Valor nunca abaixo de 0',
      ],
      dicas: [
        'Leia localStorage no useState inicial: `useState(() => JSON.parse(...))`',
        'Escreva no localStorage dentro do useEffect',
        'Teste com `jest` e `@testing-library/react`',
      ],
      exemplos: [
        { entrada: 'Incrementar 3x com passo 5', saida: 'Contador exibe 15 e persiste no reload' },
      ],
    },
    {
      titulo: 'Dashboard de Métricas com Context API',
      descricao:
        'Construa um dashboard com gráficos de linha e pizza, filtro de período e tema claro/escuro usando Context API.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: [
        'Context para tema e dados globais',
        'Gráficos com Recharts ou Chart.js',
        'Filtro de período (7d, 30d, 90d) que atualiza gráficos',
        'Toggle de tema claro/escuro persistido no localStorage',
        'Layout responsivo (mobile-first)',
      ],
      dicas: [
        'Separe os providers em arquivos dedicados',
        'Use useMemo para evitar recálculos dos dados filtrados',
        'CSS Variables facilitam a troca de tema',
      ],
      exemplos: [
        { entrada: 'Selecionar período 30d + tema escuro', saida: 'Gráficos atualizados e tema persistido no reload' },
      ],
    },
    {
      titulo: 'E-commerce com Redux Toolkit e RTK Query',
      descricao:
        'Implemente carrinho, catálogo de produtos paginado e checkout com Redux Toolkit, usando RTK Query para chamadas à API.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: [
        'RTK Query para buscar produtos (paginação)',
        'Slice de carrinho com add, remove, updateQty',
        'Checkout multi-step (dados > pagamento > confirmação)',
        'Autenticação com JWT armazenado no Redux',
        'Testes de slice com jest',
      ],
      dicas: [
        'createApi do RTK Query gera hooks automaticamente',
        'Use immer inside createSlice para mutações diretas',
        'Proteja rotas com wrapper que verifica token no state',
      ],
      exemplos: [
        { entrada: 'Adicionar 3 itens, aplicar cupom, confirmar pedido', saida: 'State: { cart: [], order: { id, status: "confirmed" } }' },
      ],
    },
  ],
  JavaScript: [
    {
      titulo: 'Validador de Formulário com Regex',
      descricao: 'Implemente validação em tempo real de email, CPF e senha forte sem dependências externas.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: [
        'Validação de email com regex RFC 5322 simplificado',
        'Validação de CPF (dígitos verificadores)',
        'Senha: 8+ chars, 1 maiúscula, 1 número, 1 especial',
        'Feedback visual em tempo real (input event)',
        'Botão submit desabilitado enquanto inválido',
      ],
      dicas: [
        'CPF: calcule dígitos verificadores manualmente',
        'Use classList.add/remove para classes de erro/sucesso',
        'Debounce no evento input para melhor UX',
      ],
      exemplos: [
        { entrada: 'email: "user@example.com"', saida: 'Campo verde, ícone ✓' },
        { entrada: 'CPF: "000.000.000-00"', saida: 'Campo vermelho: CPF inválido' },
      ],
    },
    {
      titulo: 'Gerenciador de Tarefas com Web API',
      descricao:
        'Crie um gerenciador de tarefas com drag-and-drop, filtros e sincronização com API REST usando Fetch nativo.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: [
        'CRUD via Fetch (GET, POST, PUT, DELETE)',
        'Drag and drop nativo (API HTML5)',
        'Filtro por status (todas, ativas, concluídas)',
        'Otimistic update: atualiza UI antes da resposta',
        'Retry automático em falhas de rede',
      ],
      dicas: [
        'Use dragstart, dragover, drop events',
        'AbortController para cancelar requisições pendentes',
        'Guarde os dados localmente como cache de fallback',
      ],
      exemplos: [
        { entrada: 'Arrastar tarefa para "concluída"', saida: 'Tarefa movida na UI imediatamente, sincronizada via PUT' },
      ],
    },
    {
      titulo: 'Runtime de Workers com Task Queue',
      descricao:
        'Construa um mini-runtime com Web Workers, fila de tarefas e throttling de execução paralela.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: [
        'Pool de N Web Workers configurável',
        'Fila FIFO com prioridade para tarefas urgentes',
        'Comunicação bidirecional via postMessage',
        'Timeout por tarefa com AbortController',
        'Painel de monitoramento em tempo real (DOM)',
      ],
      dicas: [
        'Crie workers inline com Blob + URL.createObjectURL',
        'Use MessageChannel para comunicação direta worker↔worker',
        'requestAnimationFrame para atualizar o painel sem travar a UI',
      ],
      exemplos: [
        { entrada: '10 tarefas, pool de 3 workers', saida: 'Execução paralela em lotes de 3, resultado em ~3.3x menos tempo' },
      ],
    },
  ],
};

function desafioGenerico(tecnologia: string, nivel: string): Desafio {
  const p = nivel === 'Básico' ? 100 : nivel === 'Avançado' ? 500 : 250;
  return {
    titulo: `Projeto Prático em ${tecnologia}`,
    descricao: `Desenvolva uma aplicação completa em ${tecnologia} aplicando boas práticas, testes e documentação.`,
    dificuldade: nivel,
    pontos: p,
    requisitos: [
      `Implementar a funcionalidade principal em ${tecnologia}`,
      'Seguir princípios de código limpo (SOLID, DRY)',
      'Tratamento de erros e casos de borda',
      'Documentação inline (JSDoc/TSDoc)',
      'Pelo menos 3 testes unitários',
    ],
    dicas: [
      `Consulte a documentação oficial de ${tecnologia}`,
      'Divida o problema em funções pequenas e testáveis',
      'Faça commits atômicos e descritivos',
    ],
    exemplos: [
      { entrada: 'Entrada principal do programa', saida: 'Saída conforme especificação' },
    ],
  };
}

export function executarComandoDesafio(tecnologia: string, nivel = 'Intermediário'): string {
  const encontradas = buscarTrilhas(tecnologia);

  if (encontradas.length === 0) {
    try {
      const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
      const raw = fs.readFileSync(dataPath, 'utf-8');
      const { trilhas } = JSON.parse(raw) as TrilhasData;
      const lista = trilhas.map(t => `- **${t.tecnologia}** — ${t.nome}`).join('\n');
      return `❌ Tecnologia não encontrada: **${tecnologia}**\n\n💡 **Trilhas disponíveis:**\n\n${lista}`;
    } catch {
      return `❌ Tecnologia não encontrada: **${tecnologia}**`;
    }
  }

  const trilha = encontradas[0];
  const nivelNorm = ['Básico', 'Intermediário', 'Avançado'].find(
    n => n.toLowerCase() === nivel.toLowerCase()
  ) ?? 'Intermediário';

  const banco = BANCO_DESAFIOS[trilha.tecnologia] ?? [];
  let pool = banco.length > 0
    ? banco.filter(d => d.dificuldade === nivelNorm)
    : [];

  if (pool.length === 0 && banco.length > 0) pool = banco;
  const desafio = pool.length > 0
    ? pool[Math.floor(Math.random() * pool.length)]
    : desafioGenerico(trilha.tecnologia, nivelNorm);

  let out = `# ⚔️ Desafio de Código — ${trilha.tecnologia}\n\n`;
  out += `## ${desafio.titulo}\n\n`;
  out += `**Dificuldade:** ${desafio.dificuldade} | **Pontos:** ${desafio.pontos} XP\n\n---\n\n`;

  out += `### 📝 Descrição\n\n${desafio.descricao}\n\n`;

  out += `### ✅ Requisitos\n\n`;
  desafio.requisitos.forEach((r, i) => { out += `${i + 1}. ${r}\n`; });
  out += `\n`;

  out += `### 💡 Dicas\n\n`;
  desafio.dicas.forEach(d => { out += `- 💭 ${d}\n`; });
  out += `\n`;

  out += `### 📊 Exemplos\n\n`;
  desafio.exemplos.forEach((ex, i) => {
    out += `**Exemplo ${i + 1}:**\n\`\`\`\nEntrada: ${ex.entrada}\nSaída:   ${ex.saida}\n\`\`\`\n\n`;
  });

  out += `### 🏆 Recompensas ao Completar\n\n`;
  out += `- ⭐ **${desafio.pontos} XP** adicionados ao perfil\n`;
  out += `- 🎖️ Badge de conclusão desbloqueada\n`;
  out += `- 📈 Progresso registrado em: **${trilha.nome}**\n\n`;

  out += `### 🚀 Como Submeter\n\n`;
  out += `1. Resolva o desafio localmente\n`;
  out += `2. Crie um repositório no GitHub com o código\n`;
  out += `3. Adicione um README com sua abordagem e como executar\n`;
  out += `4. Submeta o link na plataforma DIO\n\n`;
  out += `💪 **Boa sorte!** Use \`/desafio ${tecnologia} ${nivelNorm}\` para gerar outro desafio do mesmo nível.`;

  return out;
}

// Made with Bob
