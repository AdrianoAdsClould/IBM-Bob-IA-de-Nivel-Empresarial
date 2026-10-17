/**
 * Runner de todos os testes do GEO-EXPLORER
 *
 * Uso: npx ts-node tests/run-all-tests.ts
 */
import { execSync } from 'child_process';
import * as path from 'path';

interface TestSuite {
  nome: string;
  arquivo: string;
}

const suites: TestSuite[] = [
  { nome: 'Trilha', arquivo: 'trilha.test.ts' },
  { nome: 'Desafio', arquivo: 'desafio.test.ts' },
  { nome: 'Certificado', arquivo: 'certificado.test.ts' },
];

let totalPassed = 0;
let totalFailed = 0;
const startAll = Date.now();

console.log('\n====================================');
console.log('  GEO-EXPLORER — Suite de Testes');
console.log('====================================\n');

for (const suite of suites) {
  const filePath = path.join(__dirname, suite.arquivo);
  console.log(`\n🔷 Suite: ${suite.nome}`);
  console.log('─'.repeat(40));

  try {
    const output = execSync(`npx ts-node ${filePath}`, {
      encoding: 'utf-8',
      cwd: path.join(__dirname, '..'),
    });
    console.log(output);

    const m = output.match(/(\d+) passaram, (\d+) falharam/);
    if (m) {
      totalPassed += parseInt(m[1], 10);
      totalFailed += parseInt(m[2], 10);
    }
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string };
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);

    const out = (error.stdout ?? '') + (error.stderr ?? '');
    const m = out.match(/(\d+) passaram, (\d+) falharam/);
    if (m) {
      totalPassed += parseInt(m[1], 10);
      totalFailed += parseInt(m[2], 10);
    } else {
      totalFailed++;
    }
  }
}

const elapsed = ((Date.now() - startAll) / 1000).toFixed(2);

console.log('\n====================================');
console.log('  RESULTADO FINAL');
console.log('====================================');
console.log(`✅ Passaram : ${totalPassed}`);
console.log(`❌ Falharam : ${totalFailed}`);
console.log(`⏱️  Duração  : ${elapsed}s`);
console.log('====================================\n');

if (totalFailed > 0) {
  console.error(`❌ ${totalFailed} teste(s) falharam.`);
  process.exit(1);
} else {
  console.log('🎉 Todos os testes passaram!');
  process.exit(0);
}

// Made with Bob
