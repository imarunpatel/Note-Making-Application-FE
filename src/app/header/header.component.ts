import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
 
  constructor(
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => { 
        this.userIsAuthenticated = isAuthenticated;
      } 
      );

      this.authService.verifyLoginStatus();

  }

  onLogout() {
    this.authService.doLogOut();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
