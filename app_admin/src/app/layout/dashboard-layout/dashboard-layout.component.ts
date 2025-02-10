import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../interfaces/role.enum';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})

export class DashboardLayoutComponent {
  currentRoute: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
      });
  }

  isAdmin(): boolean {
    return this.authService.getRole() === Role.Admin;
  }

  isEditor(): boolean {
    return this.authService.getRole() === Role.Editor;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}