import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-my-acount',
  templateUrl: './my-acount.component.html',
  styleUrls: ['./my-acount.component.scss']
})
export class MyAcountComponent implements OnInit {
  isShowDashboard: Boolean = false;
  user_id !: number;
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  responseMessage!: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalContanst.emailRegex)]],
      password: [null, [Validators.required]]
    });

    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalContanst.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalContanst.emailRegex)]],
      password: [null, [Validators.required]]

    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalContanst.emailRegex)]]
    });
  }

  login() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((res: any) => {
      this.responseMessage = res?.message;
      this.user_id = res?.id;
      localStorage.setItem('token', res.token);
      this.notificationService.showSuccess(this.responseMessage);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    }
    )
  }
  signUp() {
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    this.userService.signup(data).subscribe((res: any) => {
      this.responseMessage = res?.message;
      this.notificationService.showSuccess(this.responseMessage);
      this.router.navigate(['/']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    }
    )
  }

  forgotPassword() {
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email,
    }
    this.userService.forgotPassword(data).subscribe((res: any) => {
      this.responseMessage = res?.message;
      this.notificationService.showSuccess(this.responseMessage);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);
    }
    )
  }
}
