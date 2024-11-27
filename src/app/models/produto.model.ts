export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  categoria?: {
    id: number;
    nome: string;
  };
}
