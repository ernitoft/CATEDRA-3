import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private endpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get(this.endpoint + '/posts');
  }

  public getComments() {
    return this.http.get(this.endpoint + '/comments');
  }

}
