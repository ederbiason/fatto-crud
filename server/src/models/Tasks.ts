export interface Task {
    id?: number;  
    nome: string;
    custo: number;
    data_limite: string;  
    ordem_apresentacao?: number;
}