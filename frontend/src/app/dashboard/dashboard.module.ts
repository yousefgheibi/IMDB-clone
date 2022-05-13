import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ManageFilmComponent } from './manage-film/manage-film.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent, ManageFilmComponent, ManageAccountComponent, ManageCategoryComponent]
})
export class DashboardModule { }
