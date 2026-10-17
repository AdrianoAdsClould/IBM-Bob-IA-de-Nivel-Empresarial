import * as fs from 'fs';
import * as path from 'path';
import { executarComandoCertificado } from '../commands/certificado';

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

console.log('\n🏆 Testes — executarComandoCertificado\n');

// T1: certificado válido
const res = executarComandoCertificado('João Silva', 'Python');
assert(res.includes('✅'), 'T1: retorna confirmação de sucesso');
assert(res.includes('João Silva'), 'T2: contém o nome do usuário');
assert(res.includes('Python'), 'T3: contém a tecnologia');
assert(res.includes('DIO-'), 'T4: contém código DIO-');
assert(res.includes('Badges Conquistadas'), 'T5: lista badges');
assert(res.includes('XP'), 'T6: menciona XP conquistado');

// T2: arquivo gerado em disco
const certDir = path.join(__dirname, '../docs/certificados-emitidos');
assert(fs.existsSync(certDir), 'T7: diretório certificados-emitidos existe após execução');
const arquivos = fs.readdirSync(certDir).filter(f => f.includes('João_Silva'));
assert(arquivos.length > 0, 'T8: arquivo .md do certificado foi criado em disco');

if (arquivos.length > 0) {
  const conteudo = fs.readFileSync(path.join(certDir, arquivos[0]), 'utf-8');
  assert(conteudo.includes('CERTIFICADO DE CONCLUSÃO'), 'T9: arquivo contém título do certificado');
  assert(conteudo.includes('João Silva'.toUpperCase()), 'T10: arquivo contém nome em maiúsculas');
  assert(conteudo.includes('DIO-'), 'T11: arquivo contém código de verificação');
}

// T3: nome em branco
const resSemNome = executarComandoCertificado('', 'Python');
assert(resSemNome.includes('❌'), 'T12: nome vazio retorna erro');

// T4: tecnologia inexistente
const resTechInvalida = executarComandoCertificado('Maria', 'CobolXYZ');
assert(resTechInvalida.includes('❌'), 'T13: tech inválida retorna erro');
assert(resTechInvalida.includes('Trilhas disponíveis'), 'T14: lista trilhas no erro');

// T5: código único por chamada
const res1 = executarComandoCertificado('Ana Dev', 'Java');
const res2 = executarComandoCertificado('Ana Dev', 'Java');
const cod1 = res1.match(/DIO-\d+-\d+-[A-Z]{4}/)?.[0];
const cod2 = res2.match(/DIO-\d+-\d+-[A-Z]{4}/)?.[0];
assert(cod1 !== undefined, 'T15: código 1 tem formato DIO-id-ano-XXXX');
assert(cod2 !== undefined, 'T16: código 2 tem formato DIO-id-ano-XXXX');
assert(cod1 !== cod2, 'T17: cada certificado gera código único');

console.log(`\nResultado: ${passed} passaram, ${failed} falharam\n`);
if (failed > 0) process.exit(1);

// Made with Bob
