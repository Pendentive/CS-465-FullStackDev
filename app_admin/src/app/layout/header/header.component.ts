import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User = { email: '', name: '', role: 'express' }; // TODO: Refactor with cleaner solution
  private logoutSubscription: Subscription;                     // Ensure header updates on logout

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.logoutSubscription = this.authenticationService.logout$.subscribe(() => {
      this.currentUser = { email: '', name: '', role: 'express' }; // Reset currentUser
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
  }
}