import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+'/coment/add',data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/coment/update',data);
  }


  getComentByFilm(id: number) {
    return this.httpClient.get(this.url + "/coment/getByFilm/" + id);
  }


  getComentById(id: number) {
    return this.httpClient.get(this.url + "/coment/getById/" + id);
  }


  getComentByUser(email: string){
    return this.httpClient.get(this.url + "/coment/getByUser/" +email);
  }


  deleteComent(id:number){
    return this.httpClient.delete(this.url + "/coment/delete/" + id);
  }
}
 