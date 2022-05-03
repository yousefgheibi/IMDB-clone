import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }


  getFilm() {
    return this.httpClient.get(this.url + "/film/get/");
  }

  getFilmByCategory(id: number) {
    return this.httpClient.get(this.url + "/film/getByCategory/" + id);
  }
}