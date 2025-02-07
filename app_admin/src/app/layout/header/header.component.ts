import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = 'Current User'; // Replace with actual username

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}