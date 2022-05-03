import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';
import { NotificationService } from './notification.service';
import { GlobalContanst } from '../shared/globalContanst';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(public auth: AuthService, public router: Router, private notificationService: NotificationService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean {
      
    const token:any = localStorage.getItem('token');
    
    var tokenPayload: any;

    try{
      tokenPayload = jwt_decode(token);
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    
    if(tokenPayload){
      if(this.auth.isAuthenticated()){
        return true;
      }
      this.notificationService.showSuccess(GlobalContanst.unauthorized);
      this.router.navigate(['/dashboard']);
      return false;                           
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false
    }
  }
}
