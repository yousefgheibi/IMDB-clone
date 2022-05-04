import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FilmService } from 'src/app/services/film.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-manage-film',
  templateUrl: './manage-film.component.html',
  styleUrls: ['./manage-film.component.scss']
})
export class ManageFilmComponent implements OnInit {
  dataSource : any;
  categorys: any;
  searchKey : string | undefined;
  responseMessage: any;
  showAdd !:boolean;
  showEdit !:boolean;
  movieId !: number;
  AddFilmForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private formBuilder: FormBuilder,private routerGaurd:RouterGuardService,private categoryService : CategoryService ,private roteGuard:RouterGuardService, private filmService : FilmService,private notificationService : NotificationService,private router : Router) { }

  ngOnInit(): void {
    this.AddFilmForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      product: [null, [Validators.required]],
      language: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      category: [null, [Validators.required]]
    });

  
    this.tableData();
    this.getCategorys();
  }

  tableData(){
    this.filmService.getFilmByUser(this.roteGuard.tokenPayloadEmail).subscribe((res:any)=>{
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
    // this.isWait = true;
  }

  
  logout(){
    localStorage.removeItem('token');
    this.notificationService.showSuccess("Exit successfully!");
    this.router.navigate(['/my-account']);
  }


  doSearch(searchKey : string) {
    let result = [];
    if(searchKey.length > 2) {
      result = this.dataSource.filter((item: { title: string; }) => {
        // @ts-ignore
        return !(item.title.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if(result.length > 0 ){
      this.dataSource = result;
    }
    else{
        this.tableData();
    }
  }

  deleteMovie(id: number){
    let c = confirm("Are you sure you want to delete this Movie?");
    if (c) {
      this.filmService.deleteFilm(id).subscribe((res:any)=>{
        this.notificationService.showSuccess("Successfully deleted!");
        this.tableData();
   
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


getCategorys(){
  this.categoryService.getCategorys().subscribe((res:any)=>{
    this.categorys = res;
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
  editMovie(item : any){
    this.showAdd = false;
    this.showEdit = true;
    this.movieId = item.id;
    this.AddFilmForm.controls['title'].setValue(item.title);
    this.AddFilmForm.controls['description'].setValue(item.description);
    this.AddFilmForm.controls['product'].setValue(item.product);
    this.AddFilmForm.controls['language'].setValue(item.language);
    this.AddFilmForm.controls['duration'].setValue(item.duration);
    this.AddFilmForm.controls['category'].setValue(item.category_id);
  }

  clicktoAddMovie(){
    this.showAdd = true;
    this.showEdit = false;
  }

  addMovie(){
    var formData = this.AddFilmForm.value;
    const data ={
      email: this.routerGaurd.tokenPayloadEmail,
      title: formData.title,
      description: formData.description,
      product: formData.product,
      duration : formData.duration,
      language: formData.language,
      category_id : formData.category
    }

    this.filmService.add(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
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

  EditMoviePost(){
    var formData = this.AddFilmForm.value;
    const data ={
      id : this.movieId,
      title: formData.title,
      description: formData.description,
      product: formData.product,
      duration : formData.duration,
      language: formData.language,
      category_id : formData.category
    }
    this.filmService.update(data).subscribe((res:any)=>{

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
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
