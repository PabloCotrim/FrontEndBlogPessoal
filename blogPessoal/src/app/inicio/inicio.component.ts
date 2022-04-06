import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { UsuarioModel } from './../model/UsuarioModel';
import { TemaModel } from './../model/TemaModel';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { PostagemModel } from './../model/PostagemModel';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tema: TemaModel = new TemaModel()
  postagem: PostagemModel = new PostagemModel()
  listaTemas: TemaModel[]
  idTema: number
  nomeTema: string

  idUsuario = environment.id
  user: UsuarioModel = new UsuarioModel()
  listaPostagens: PostagemModel[]
  tituloPost: string

  key = 'data'
  reverse = true

  constructor(private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: UsuarioModel) => {
      this.user = resp
    })

  }


  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUsuario
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }

  findByTituloPostagem() {

    if (this.tituloPost = '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: PostagemModel[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    } else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: TemaModel[])=>{
        this.listaTemas = resp
      })
    }
  }

}
