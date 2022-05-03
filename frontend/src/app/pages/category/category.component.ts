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
  isWait : boolean = false;
  searchKey : string | undefined;
  data: any;
  responseMessage:any;
  constructor(private categoryService : CategoryService , private notificationService : NotificationService , private filmService : FilmService) { }

  ngOnInit(): void {
    this.tableData();
    this.getAll();
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
    this.isWait = true;
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


  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    const searchdata = [] = this.data.title;
    searchdata.filter = filterValue.trim().toLowerCase();
    console.log(searchdata);
  }

  doSearch(searchKey : string) {
    let result = [];
    if(searchKey.length > 2) {
      result = this.data.filter((item: { title: string; }) => {
        // @ts-ignore
        return !(item.title.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if(result.length > 0 ){
      this.data = result;
    }
    else{
        this.getAll();
    }
  }
}
