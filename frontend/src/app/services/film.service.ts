import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+'/film/add',data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/film/update',data);
  }


  getFilm() {
    return this.httpClient.get(this.url + "/film/get/");
  }

  getFilmByCategory(id: number) {
    return this.httpClient.get(this.url + "/film/getByCategory/" + id);
  }


  getFilmById(id: number) {
    return this.httpClient.get(this.url + "/film/getById/" + id);
  }


  getFilmByUser(email: string){
    return this.httpClient.get(this.url + "/film/getByUser/" +email);
  }


  deleteFilm(id:number){
    return this.httpClient.delete(this.url + "/film/delete/" + id);
  }
}