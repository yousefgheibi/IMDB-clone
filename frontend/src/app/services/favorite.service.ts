import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  myFavArray:any = [];
  constructor(private _notificationService: NotificationService) {}

  addToFavorite(film: any) {
    const val = localStorage.getItem('items');

    if (val !== null) {
      this.myFavArray = JSON.parse(val);
    }

    let checkExists: boolean = false;
    for (var i = 0; i < this.myFavArray.length; i++) {
      if (film.id == this.myFavArray[i].id) {
        checkExists = true;
        this._notificationService.showError(
          'There is a movie in favorites!'
        );
      }
    }
    if (checkExists == false) {
      this.myFavArray.push(film);
      this._notificationService.showSuccess(
        'Movie successfully added to favorites.'
      );
    }
    localStorage.setItem('items', JSON.stringify(this.myFavArray));
  }
}