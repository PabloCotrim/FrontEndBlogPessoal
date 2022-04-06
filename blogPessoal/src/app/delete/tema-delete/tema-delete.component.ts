import { AlertasService } from './../../service/alertas.service';
import { environment } from './../../../environments/environment.prod';
import { TemaService } from './../../service/tema.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { TemaModel } from './../../model/TemaModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  idTema: number

  constructor(private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private alertas: AlertasService) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: TemaModel)=>{
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      this.alertas.showAlertDanger('Tema Deletado!')
      this.router.navigate(['/tema'])
    })
  }

}
