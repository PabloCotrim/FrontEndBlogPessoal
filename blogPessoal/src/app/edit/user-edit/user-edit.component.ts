import { environment } from './../../../environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { UsuarioModel } from './../../model/UsuarioModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  idUser: number
  confirmarSenha: string
  tipoUsuario: string
  usuario: UsuarioModel = new UsuarioModel()

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0, 0)


    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      alert("Senha Invalida")
    } else {                            // sobscrever a senha em formato json
      this.authService.cadastrar(this.usuario).subscribe((resp: UsuarioModel) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert("Atualização realizada, faça login novamente.")
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
    })
  }

}


