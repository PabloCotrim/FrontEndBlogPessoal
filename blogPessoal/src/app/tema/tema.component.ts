import { AlertasService } from './../service/alertas.service';
import { TemaService } from './../service/tema.service';
import { TemaModel } from './../model/TemaModel';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo
      ('Necessita ser administrador para acessar está informação')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: TemaModel) => {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema Cadastrado!')
      this.findAllTemas()
      this.tema = new TemaModel()
    })
  }

}
