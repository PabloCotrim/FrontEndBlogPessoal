import { TemaModel } from './../model/TemaModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<TemaModel[]> {
    return this.http.get<TemaModel[]>('http://localhost:8080/temas', this.token)
  }

  getByIdTema(id: number): Observable<TemaModel> {
    return this.http.get<TemaModel>(`http://localhost:8080/temas/${id}`, this.token)
  }

  postTema(tema: TemaModel): Observable<TemaModel> {
    return this.http.post<TemaModel>('http://localhost:8080/temas', tema, this.token)
  }

  putTema(tema: TemaModel): Observable<TemaModel> {
    return this.http.put<TemaModel>('http://localhost:8080/temas', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)
  }

}
