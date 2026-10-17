import * as fs from 'fs';
import * as path from 'path';
import { Trilha, TrilhasData, Desafio } from './types.js';

const DATA_PATH = path.join(__dirname, '../../data/trilhas_dio.json');

function carregarTrilhas(): TrilhasData {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as TrilhasData;
}

export function listarTodasTrilhas(): Trilha[] {
  return carregarTrilhas().trilhas;
}

export function buscarTrilhaPorTecnologia(tecnologia: string): Trilha[] {
  const { trilhas } = carregarTrilhas();
  return trilhas.filter(
    (t: Trilha) =>
      t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase()) ||
      t.nome.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

export function gerarDesafioParaTrilha(trilha: Trilha, nivel: string): Desafio {
  const nivelNorm = ['Básico', 'Intermediário', 'Avançado'].find(
    n => n.toLowerCase() === nivel.toLowerCase()
  ) ?? 'Intermediário';
  const pontos = nivelNorm === 'Básico' ? 100 : nivelNorm === 'Avançado' ? 500 : 250;

  return {
    titulo: `Desafio ${nivelNorm} — ${trilha.tecnologia}`,
    descricao: `Desenvolva um projeto prático em ${trilha.tecnologia} que demonstre os conceitos do nível ${nivelNorm}.`,
    dificuldade: nivelNorm,
    pontos,
    requisitos: [
      `Aplicar conceitos centrais de ${trilha.tecnologia}`,
      'Código limpo com tratamento de erros',
      'Documentação inline',
      'Pelo menos 3 testes unitários',
    ],
    dicas: [
      `Consulte a documentação oficial de ${trilha.tecnologia}`,
      'Comece pequeno e itere',
      'Faça commits atômicos',
    ],
    exemplos: [
      { entrada: 'Entrada principal', saida: 'Saída conforme especificação' },
    ],
  };
}

export function gerarCodigoCertificado(id: number): string {
  const alfa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const sufixo = Array.from({ length: 4 }, () => alfa[Math.floor(Math.random() * 26)]).join('');
  return `DIO-${id}-${new Date().getFullYear()}-${sufixo}`;
}

// Made with Bob
