import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private notificationService : NotificationService,private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    this.notificationService.showSuccess("Exit successfully!");
    this.router.navigate(['/my-account']);
  }

  
}
