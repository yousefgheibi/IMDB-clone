import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageCommentComponent } from './manage-comment/manage-comment.component';
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
{
  path: 'manage-account',
  component: ManageAccountComponent
},
{
  path: 'manage-category',
  component: ManageCategoryComponent
},
{
  path: 'manage-comment',
  component: ManageCommentComponent
}
];
