import { AlertasService } from './../../service/alertas.service';
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { TemaModel } from './../../model/TemaModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: TemaModel = new TemaModel()

  constructor(private TemaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number) {
    this.TemaService.getByIdTema(id).subscribe((resp: TemaModel) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.TemaService.putTema(this.tema).subscribe((resp: TemaModel) => {
      this.tema = resp
    this.alertas.showAlertSuccess('Tema Atualizado!')
      this.router.navigate(['/tema'])
    })
  }

}
