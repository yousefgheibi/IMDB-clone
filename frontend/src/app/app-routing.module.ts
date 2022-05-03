import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { CategoryComponent } from './pages/category/category.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { HomeComponent } from './pages/home/home.component';
import { MyAcountComponent } from './my-acount/my-acount.component';
import { TopMovieComponent } from './pages/top-movie/top-movie.component';
import { RouterGuardService } from './services/router-guard.service';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'category', component: CategoryComponent  },
      { path: 'top-movie', component: TopMovieComponent  },
      { path: 'favorite', component: FavoriteComponent  },
      { path: 'my-account', component: MyAcountComponent },
      {  path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[RouterGuardService],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
