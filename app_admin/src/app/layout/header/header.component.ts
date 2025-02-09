import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterLink // Add RouterLink to imports
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username = 'Admin'; // Replace with actual username if available

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}