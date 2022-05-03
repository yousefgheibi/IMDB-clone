import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FullComponent } from './layout/full/full.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { TopMovieComponent } from './pages/top-movie/top-movie.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { MyAcountComponent } from './pages/my-acount/my-acount.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FullComponent,
    HomeComponent,
    CategoryComponent,
    TopMovieComponent,
    FavoriteComponent,
    MyAcountComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
