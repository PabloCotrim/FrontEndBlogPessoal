import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from './../model/UsuarioLogin';
import { UsuarioModel } from './../model/UsuarioModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { // metodos http
}

  entrar(usuarioLogin:UsuarioLogin): Observable<UsuarioLogin>{  //forçando a usar usuarioLogin
    return this.http.post<UsuarioLogin>('https://blogpessoaldopablo.herokuapp.com/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel> {  //forçando a usar usuariomodel
    return this.http.post<UsuarioModel>('https://blogpessoaldopablo.herokuapp.com/usuarios/cadastrar', usuario);

  }

  logado(){
    let ok: boolean = false

    if(environment.token !=''){
      ok = true
    }

    return ok
  }
}
