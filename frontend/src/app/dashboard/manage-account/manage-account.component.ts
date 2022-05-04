import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterGuardService } from 'src/app/services/router-guard.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalContanst } from 'src/app/shared/globalContanst';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  UserForm !: FormGroup;
  userInformation: any;
  responseMessage: any;
  constructor(private userService: UserService, private routerGaurd: RouterGuardService, private notificationService: NotificationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalContanst.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalContanst.emailRegex)]],
      password: [null, [Validators.required]]
    });

    this.getUserInfotmation();
    this.updateUser();
  }

  getUserInfotmation() {
    this.userService.getSingleUser(this.routerGaurd.tokenPayloadEmail).subscribe((res: any) => {
      this.userInformation = res;
      this.UserForm.controls['email'].setValue(res.email);
      this.UserForm.controls['name'].setValue(res.name);
      this.UserForm.controls['password'].setValue(res.password);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContanst.genericError;
      }
      this.notificationService.showError(this.responseMessage);

    });
  }

  logout() {
    localStorage.removeItem('token');
    this.notificationService.showSuccess("Exit successfully!");
    this.router.navigate(['/my-account']);
  }


  updateUser() {
    var formData = this.UserForm.value;
    const data ={
      id: this.userInformation.id,
      name: formData.name,
      password: formData.password,
    }
    this.userService.update(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
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
