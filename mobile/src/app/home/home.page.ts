import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts:any = []
  comments:any = []
  postComments: any = [];

  constructor(private api: ApiServiceService) { }

  ngOnInit() {
    this.getPosts();
    this.getComments();
    this.getCommentsByPostId(1);
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
    for(let comment of this.comments){
      if(comment.postId == postId){
        this.postComments.push(comment);
      }
    }

    console.log(this.postComments);
    return this.postComments;
  }

}
