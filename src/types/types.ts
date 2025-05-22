
export interface Contato {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
}

export interface ContatoOuvidoria {
    nome?: string;
    email?: string;
    telefone?: string;
    mensagem: string;
}
