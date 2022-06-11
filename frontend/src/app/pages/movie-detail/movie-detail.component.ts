import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { FilmService } from 'src/app/services/film.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  subscriptionSingleMovie: Subscription | undefined;
  subscriptionAllMovie: Subscription | undefined;
  movie: any;
  allMovie : any;
  allComent: any;
  dataSource: any;
  responseMessage:any;
  AddComentForm !: FormGroup;
  email!: string;
  constructor( private formBuilder: FormBuilder,private routerGaurd: RouterGuardService,private notificationService: NotificationService, private comentService: CommentService, private route: ActivatedRoute, private _api: FilmService) { }

  ngOnInit(): void {

    this.AddComentForm = this.formBuilder.group({
      content: [null, [Validators.required]]
    });
    this.getSingleBlog();
    this.getAllBlog();
    this.tableData();
    this.email = this.routerGaurd.tokenPayloadEmail;
  }

  tableData() {
    const routeParams = this.route.snapshot.paramMap;
    const movieIdFromRoute = Number(routeParams.get('movieId'));
    this.comentService.getComentByFilm(movieIdFromRoute).subscribe((res: any) => {
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


  getSingleBlog() {
    const routeParams = this.route.snapshot.paramMap;
    const movieIdFromRoute = Number(routeParams.get('movieId'));
    this.subscriptionSingleMovie = this._api
      .getFilmById(movieIdFromRoute)
      .subscribe((res) => {
        this.movie = res;
      });
  }

  getAllBlog() {
    this.subscriptionAllMovie = this._api.getFilm().subscribe((res) => {
      this.allMovie = res;
    });
  }


  addComment() {
    const routeParams = this.route.snapshot.paramMap;
    const movieIdFromRoute = Number(routeParams.get('movieId'));
    var formData = this.AddComentForm.value;
    const data = {
      email:this.email,
      content: formData.content,
      film_id: movieIdFromRoute
    }

    console.log(data)
    this.comentService.add(data).subscribe((res: any) => {
      this.responseMessage = res.message;
      this.tableData();
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
