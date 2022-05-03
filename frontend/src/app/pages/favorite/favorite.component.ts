import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: any;
  constructor(
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    const val = localStorage.getItem('items');
    if (val !== null) {
      this.favoriteProducts = JSON.parse(val);
      this.hasProduct();
    }
  }


  removeFromFavorite(item:any) {
    const index = this.favoriteProducts.indexOf(item);
    this.favoriteProducts.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.favoriteProducts));
    this._notificationService.showError(
      'Movie successfully removed from favorites!'
    );
    this.hasProduct();
  }

  hasProduct() {
    if (this.favoriteProducts.length != 0) {
      return true;
    } else {
      return false;
    }
  }
}