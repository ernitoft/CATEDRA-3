import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts:any = []
  comments:any = []
  postComments: any = [];
  selectedPostId: number | null = null;
  authorFilter: string = '';
  filteredPosts: any[] = [];


  constructor(private api: ApiServiceService, private alertController: AlertController) { }

  ngOnInit() {
    this.getPosts();
    this.getComments();
    console.log(this.posts);
  }
  

  getPosts() {
    this.api.getData().subscribe(res => {
      console.log(res);
      this.posts = res;
    }, err => {
      console.log(err);
    });
  }

  getComments() {
    this.api.getComments().subscribe(res => {
      console.log(res);
      this.comments = res;
    }, err => {
      console.log(err);
    });
  }

  getCommentsByPostId(postId:number): any[]{
    this.postComments = [];
    for(let comment of this.comments){
      if(comment.postId == postId){
        this.postComments.push(comment);
      }
    }
    console.log(this.postComments);
    return this.postComments;
  }
  toggleComments(postId: number) {
    if (this.selectedPostId === postId) {
      this.selectedPostId = null;
      this.postComments = [];
    } else {
      this.selectedPostId = postId;
      this.getCommentsByPostId(postId);
    }
  }

  async deletePost(id: number, title: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar post: '+title,
      message: '¿Está seguro que desea eliminarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        }, {
          text: 'Aceptar',
          handler: () => {
            this.api.deletePost(id).subscribe(res => {
              this.getPosts();
            }, err => {
            });
          }
        }
      ]
    });
    await alert.present();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter(this.posts,(this.posts.author.includes(this.authorFilter)));
  }
}
