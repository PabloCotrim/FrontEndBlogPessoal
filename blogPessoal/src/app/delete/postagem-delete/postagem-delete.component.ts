import { environment } from './../../../environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemModel } from './../../model/PostagemModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  idPost: number

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) => {
      this.postagem = resp
    })
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      alert('Postagem Deletada!')
      this.router.navigate(['/inicio'])
    })
  }
}
