import { AlertasService } from './../service/alertas.service';
import { UsuarioModel } from './../model/UsuarioModel';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  usuario: UsuarioModel = new UsuarioModel // referenciando uma nova model "usuario"
  confirmarSenha: string;
  tipoUsario: string;

  constructor(
   private authService: AuthService, // o modulo de cadastrar depende do authservice
   private router: Router,
   private alertas: AlertasService
  ) { }

  ngOnInit() { //dando preferencia para iniciar os metodos presentes aqui
    window.scroll(0, 0)
  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsario = event.target.value
  }

  cadastrarUsuario() {
    this.usuario.tipo = this.tipoUsario
    
    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger("Senha Invalida")
    } else {                            // sobscrever a senha em formato json
      this.authService.cadastrar(this.usuario).subscribe((resp: UsuarioModel) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess("Cadastro realizado!")
      })

    }
  }
}


