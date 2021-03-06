import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  @ViewChild('aside') sidebar!: ElementRef;
  constructor(private renderer: Renderer2,private authService : AuthService) { }

  ngOnInit(): void {
    document.getElementById('close-btn')?.addEventListener('click', () => {
      this.renderer.setStyle(this.sidebar.nativeElement, 'display', 'none');
    });

    document.getElementById('menu-btn')?.addEventListener('click', () => {
      console.log('clicked');
      this.renderer.setStyle(this.sidebar.nativeElement, 'display', 'flex');
    });

    this.isAuthenticated();
  }

  onCloseMenu() {
    this.renderer.setStyle(this.sidebar.nativeElement, 'display', 'none');
  }

  isAuthenticated(){
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
