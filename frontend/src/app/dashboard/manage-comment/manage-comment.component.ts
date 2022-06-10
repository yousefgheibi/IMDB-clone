import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { FilmService } from 'src/app/services/film.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './manage-comment.component.html',
  styleUrls: ['./manage-comment.component.scss']
})
export class ManageCommentComponent implements OnInit {
  dataSource: any;
  films: any;
  filmName: any;
  searchKey: string | undefined;
  responseMessage: any;
  showAdd !: boolean;
  showEdit !: boolean;
  commentId !: number;
  AddComentForm !: FormGroup;
  @ViewChild('closebutton') closebutton: any;

  constructor(private formBuilder: FormBuilder, private routerGaurd: RouterGuardService, private categoryService: CategoryService, private comentService: CommentService, private roteGuard: RouterGuardService, private filmService: FilmService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.AddComentForm = this.formBuilder.group({
      content: [null, [Validators.required]],
      film: [null, [Validators.required]]
    });

    this.getFilms();
    this.tableData();
  }

  tableData() {
    this.comentService.getComentByUser(this.roteGuard.tokenPayloadEmail).subscribe((res: any) => {
      this.dataSource = res;
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
    // this.isWait = true;
  }

  getFilms(){
    this.filmService.getFilm().subscribe((res:any)=>{
      this.films = res;
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

  logout() {
    localStorage.removeItem('token');
    this.notificationService.showSuccess("Exit successfully!");
    this.router.navigate(['/my-account']);
  }


  doSearch(searchKey: string) {
    let result = [];
    if (searchKey.length > 2) {
      result = this.dataSource.filter((item: { content: string; }) => {
        // @ts-ignore
        return !(item.content.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if (result.length > 0) {
      this.dataSource = result;
    }
    else {
      this.tableData();
    }
  }

  deleteComment(id: number) {
    let c = confirm("Are you sure you want to delete this Comment?");
    if (c) {
      this.comentService.deleteComent(id).subscribe((res: any) => {
        this.notificationService.showSuccess("Successfully deleted!");
        this.tableData();

      }, (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        }
        else {
          this.responseMessage = GlobalContanst.genericError;
        }
        this.notificationService.showError(this.responseMessage);
      })
    }
  }


  getFilmById(id: number) {
    this.filmService.getFilmById(id).subscribe((res: any) => {
      this.filmName = res;
      console.log(res);
      // return res.title;
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }

  editComment(item: any) {
    this.showAdd = false;
    this.showEdit = true;
    this.commentId = item.id;
    this.AddComentForm.controls['content'].setValue(item.content);
    this.AddComentForm.controls['film'].setValue(item.film_id);
  }

  clicktoAddComment() {
    this.showAdd = true;
    this.showEdit = false;
  }

  addComment() {
    var formData = this.AddComentForm.value;
    const data = {
      email: this.routerGaurd.tokenPayloadEmail,
      content: formData.content,
      film_id: formData.film
    }

    this.comentService.add(data).subscribe((res: any) => {

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })

  }

  EditCommentPost() {
    var formData = this.AddComentForm.value;
    const data = {
      id: this.commentId,
      content: formData.content,
      film_id : formData.film
    }
    console.log(data);
    this.comentService.update(data).subscribe((res: any) => {

      this.responseMessage = res.message;
      this.tableData();
      this.closebutton.nativeElement.click();
      this.notificationService.showSuccess(this.responseMessage);
    }, (err: any) => {
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    })
  }
}
