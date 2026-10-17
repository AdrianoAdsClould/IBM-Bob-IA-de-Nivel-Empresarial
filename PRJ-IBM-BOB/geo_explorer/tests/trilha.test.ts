import { executarComandoTrilha, buscarTrilhas } from '../commands/trilha';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string): void {
  if (condition) {
    console.log(`  ✅ ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ ${msg}`);
    failed++;
  }
}

console.log('\n📚 Testes — executarComandoTrilha\n');

// T1: tecnologia existente
const resPython = executarComandoTrilha('Python');
assert(resPython.includes('Python'), 'T1: retorna conteúdo com "Python"');
assert(resPython.includes('Plano de Estudos'), 'T2: contém "Plano de Estudos"');
assert(resPython.includes('Fase 1'), 'T3: contém "Fase 1 — Fundamentos"');
assert(resPython.includes('Fase 2'), 'T4: contém "Fase 2 — Intermediário"');
assert(resPython.includes('Fase 3'), 'T5: contém "Fase 3 — Avançado"');

// T2: tecnologia inexistente
const resInvalida = executarComandoTrilha('CobolXYZ');
assert(resInvalida.includes('❌'), 'T6: tecnologia inválida retorna mensagem de erro');
assert(resInvalida.includes('Trilhas disponíveis'), 'T7: lista trilhas disponíveis no erro');

// T3: sem argumento
const resSemArg = executarComandoTrilha('');
assert(resSemArg.includes('❌'), 'T8: sem argumento retorna erro');

// T4: buscarTrilhas helper
const java = buscarTrilhas('Java');
assert(java.length > 0, 'T9: buscarTrilhas("Java") retorna ao menos 1 trilha');
assert(java[0].tecnologia === 'Java', 'T10: tecnologia da trilha encontrada é "Java"');

const nada = buscarTrilhas('ZZZ_NAO_EXISTE');
assert(nada.length === 0, 'T11: buscarTrilhas de tech inexistente retorna array vazio');

// T5: busca case-insensitive
const react = buscarTrilhas('react');
assert(react.length > 0, 'T12: busca case-insensitive funciona ("react" → "React")');

console.log(`\nResultado: ${passed} passaram, ${failed} falharam\n`);
if (failed > 0) process.exit(1);

// Made with Bob
