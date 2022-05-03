import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FilmService } from 'src/app/services/film.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  dataSource:any;
  data: any;
  responseMessage:any;
  constructor(private categoryService : CategoryService , private notificationService : NotificationService , private filmService : FilmService) { }

  ngOnInit(): void {
    this.tableData();
  } 

  tableData(){
    this.categoryService.getCategorys().subscribe((res:any)=>{
      this.dataSource = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }

  getAll(){
    this.filmService.getFilm().subscribe((res:any)=>{
      this.data = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  
  }

  getByCategory(id : number){
    this.filmService.getFilmByCategory(id).subscribe((res:any)=>{
      this.data = res;
    },(err:any)=>{
      if(err.error?.message){
        this.responseMessage = err.error?.message;
      }
      else{
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  
  }

}
