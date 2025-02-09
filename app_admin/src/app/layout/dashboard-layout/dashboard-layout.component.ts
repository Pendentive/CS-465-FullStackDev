import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../interfaces/role.enum';
import { CommonModule } from '@angular/common';

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
  constructor(private authService: AuthenticationService) {}

  isAdmin(): boolean {
    return this.authService.getRole() === Role.Admin;
  }

  isEditor(): boolean {
    return this.authService.getRole() === Role.Editor;
  }
}