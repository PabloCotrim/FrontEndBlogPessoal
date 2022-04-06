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
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel> {  //forçando a usar usuariomodel
    return this.http.post<UsuarioModel>('http://localhost:8080/usuarios/cadastrar', usuario);

  }


  getByIdUsuario(id: number): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`http://localhost:8080/usuarios/${id}`)
}

  logado(){
    let ok: boolean = false

    if(environment.token !=''){
      ok = true
    }

    return ok
  }
}
