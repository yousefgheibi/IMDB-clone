import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+'/rating/add',data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/rating/update',data);
  }


  getComentByFilm(id: number) {
    return this.httpClient.get(this.url + "/rating/getByFilm/" + id);
  }


  getComentByUser(email: string){
    return this.httpClient.get(this.url + "/rating/getByUser/" +email);
  }


  deleteComent(id:number){
    return this.httpClient.delete(this.url + "/rating/delete/" + id);
  }
}
 