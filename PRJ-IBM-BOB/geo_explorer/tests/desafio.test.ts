import { executarComandoDesafio } from '../commands/desafio';

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

console.log('\n⚔️  Testes — executarComandoDesafio\n');

// T1: tecnologia existente, nível padrão
const resPython = executarComandoDesafio('Python');
assert(resPython.includes('Desafio de Código'), 'T1: retorna título do desafio');
assert(resPython.includes('Requisitos'), 'T2: contém seção Requisitos');
assert(resPython.includes('Dicas'), 'T3: contém seção Dicas');
assert(resPython.includes('Exemplos'), 'T4: contém seção Exemplos');
assert(resPython.includes('XP'), 'T5: menciona XP nas recompensas');

// T2: nível Básico
const resBasico = executarComandoDesafio('Python', 'Básico');
assert(resBasico.includes('Básico'), 'T6: nível Básico reflete na saída');
assert(resBasico.includes('100 XP'), 'T7: nível Básico vale 100 XP');

// T3: nível Avançado
const resAvancado = executarComandoDesafio('Python', 'Avançado');
assert(resAvancado.includes('Avançado'), 'T8: nível Avançado reflete na saída');
assert(resAvancado.includes('500 XP'), 'T9: nível Avançado vale 500 XP');

// T4: tecnologia inexistente
const resInvalida = executarComandoDesafio('CobolXYZ');
assert(resInvalida.includes('❌'), 'T10: tech inválida retorna erro');
assert(resInvalida.includes('Trilhas disponíveis'), 'T11: lista trilhas no erro');

// T5: tech sem desafio específico usa genérico
const resGenerico = executarComandoDesafio('IBM Watson', 'Intermediário');
assert(resGenerico.includes('Desafio de Código'), 'T12: tech sem banco usa desafio genérico');
assert(resGenerico.includes('IBM Watson'), 'T13: desafio genérico menciona a tecnologia');

// T6: nível inválido usa Intermediário
const resNivelInvalido = executarComandoDesafio('React', 'Ninja');
assert(resNivelInvalido.includes('Desafio de Código'), 'T14: nível inválido não falha');

console.log(`\nResultado: ${passed} passaram, ${failed} falharam\n`);
if (failed > 0) process.exit(1);

// Made with Bob
