import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user_id : any;
  url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  
  signup(data :any){
    return this.httpClient.post(this.url+'/user/signup',data,{
      headers : new HttpHeaders().set('Content-Type','application/json')
    })
  }


  login(data:any){
    return this.httpClient.post(this.url+'/user/login',data,{
      headers : new HttpHeaders().set('Content-Type','application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken"); 
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + '/user/changePassword',data)
  }

  getUsers(){
    return this.httpClient.get(this.url+"/user/get/");
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+"/user//forgotPassword",data);
  }
}
