import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ManageFilmComponent } from './manage-film/manage-film.component';

export const DashboardRoutes: Routes = [
  {
  path: '',
  component: DashboardComponent
},
{
  path: 'manage-movie',
  component: ManageFilmComponent
},
];
