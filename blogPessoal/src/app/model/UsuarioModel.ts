import { PostagemModel } from './PostagemModel';
export class UsuarioModel{

    public id: number;

    public usuario: string;

    public nome: string;

    public senha: string;

    public foto: string;

    public tipo: string;

//a partir desta linha, acrescente informações da postagem

    public postagem: PostagemModel[] ; // relacionando postagem com usuario

    // varias postagens para um usuario o array simboliza isso

}