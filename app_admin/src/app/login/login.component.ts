import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formError: string = '';
  submitted = false;

  credentials = {
    //name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public onLoginSubmit(): void {

    this.formError = '';
    if(!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    }
    else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      email: this.credentials.email,
    } as User;
  
    // Subscribe to the login Observable
    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: (authResp) => {
        // console.log('Login successful. Token received:', authResp.token);
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']); // Navigate to home or dashboard
        }
      },
      error: (err) => {
        // console.error('Login failed:', err);
        this.formError = 'Login failed. Please try again.';
      },
    });
  }
  
}
