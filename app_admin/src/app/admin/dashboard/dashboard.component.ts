import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}