export interface Trilha {
  id: number;
  nome: string;
  tecnologia: string;
  nivel: string;
  numeroModulos: number;
  xpTotal: number;
  badgesDisponiveis: string[];
  promocoes: string[];
  vitalicio: boolean;
  livesAoVivo: string[];
}

export interface TrilhasData {
  trilhas: Trilha[];
}

export interface Desafio {
  titulo: string;
  descricao: string;
  dificuldade: string;
  pontos: number;
  requisitos: string[];
  dicas: string[];
  exemplos: { entrada: string; saida: string }[];
}

export interface ToolResult {
  content: { type: 'text'; text: string }[];
  isError?: boolean;
}

// Made with Bob
