import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { FilmService } from 'src/app/services/film.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RateService } from 'src/app/services/rate.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';


@Component({
  selector: 'app-manage-rate',
  templateUrl: './manage-rate.component.html',
  styleUrls: ['./manage-rate.component.scss']
})
export class ManageRateComponent implements OnInit {
  dataSource: any;
  films: any;
  filmName: any;
  searchKey: string | undefined;
  responseMessage: any;
  showAdd !: boolean;
  showEdit !: boolean;
  rateId !: number;
  AddRateForm !: FormGroup;
  @ViewChild('closebutton') closebutton: any;

  constructor(private formBuilder: FormBuilder, private routerGaurd: RouterGuardService, private rateService: RateService, private roteGuard: RouterGuardService, private filmService: FilmService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.AddRateForm = this.formBuilder.group({
      rate: [null, [Validators.required]],
      film: [null, [Validators.required]]
    });

    this.getFilms();
    this.tableData();
  }

  tableData() {
    this.rateService.getComentByUser(this.roteGuard.tokenPayloadEmail).subscribe((res: any) => {
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

  getFilms() {
    this.filmService.getFilm().subscribe((res: any) => {
      this.films = res;
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

  logout() {
    localStorage.removeItem('token');
    this.notificationService.showSuccess("Exit successfully!");
    this.router.navigate(['/my-account']);
  }
  counter(i: number) {
    return new Array(i);
  }

  doSearch(searchKey: string) {
    let result = [];
    if (searchKey.length >1) {
      result = this.dataSource.filter((item: { rate: number; }) => {
        // @ts-ignore
        return !(item.rate.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if (result.length > 0) {
      this.dataSource = result;
    }
    else {
      this.tableData();
    }
  }

  deleteRate(id: number) {
    let c = confirm("Are you sure you want to delete this Rate?");
    if (c) {
      this.rateService.deleteComent(id).subscribe((res: any) => {
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

  editRate(item: any) {
    this.showAdd = false;
    this.showEdit = true;
    this.rateId = item.id;
    this.AddRateForm.controls['rate'].setValue(item.rate);
    this.AddRateForm.controls['film'].setValue(item.film_id);
  }

  clicktoAddRate() {
    this.AddRateForm.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  addRate() {
    var formData = this.AddRateForm.value;
    const data = {
      email: this.routerGaurd.tokenPayloadEmail,
      rate: formData.rate,
      film_id: formData.film
    }

    this.rateService.add(data).subscribe((res: any) => {

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

  EditRatePost() {
    var formData = this.AddRateForm.value;
    const data = {
      id: this.rateId,
      rate: formData.rate,
      film_id: formData.film
    }
    console.log(data);
    this.rateService.update(data).subscribe((res: any) => {

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
