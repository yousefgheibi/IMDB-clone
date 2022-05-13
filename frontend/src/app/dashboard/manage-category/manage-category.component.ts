import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  dataSource : any;
  categorys: any;
  searchKey : string | undefined;
  responseMessage: any;
  showAdd !:boolean;
  showEdit !:boolean;
  categoryId !: number;
  AddCategoryForm !: FormGroup;
  @ViewChild('closebutton') closebutton : any;
  constructor(private formBuilder: FormBuilder,private routerGaurd:RouterGuardService,private categoryService : CategoryService ,private roteGuard:RouterGuardService, private notificationService : NotificationService,private router : Router) { }

  ngOnInit(): void {
    this.AddCategoryForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
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

  clicktoAddCategory(){
    this.showAdd = true;
    this.showEdit = false;
  }

  addCategory(){
    var formData = this.AddCategoryForm.value;
    const data ={
      name: formData.name,
    }

    this.categoryService.add(data).subscribe((res:any)=>{

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

  editCategoryClick(item : any){
    this.showAdd = false;
    this.showEdit = true;
    this.categoryId = item.id;
    this.AddCategoryForm.controls['name'].setValue(item.name);
  }

  EditCategory(){
    var formData = this.AddCategoryForm.value;
    const data ={
      id : this.categoryId,
      name: formData.name,
    
    }
    this.categoryService.update(data).subscribe((res:any)=>{

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
