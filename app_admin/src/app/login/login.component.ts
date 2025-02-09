import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

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
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      email: this.credentials.email,
    } as User;

    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: (authResp) => {
        if (this.authenticationService.isLoggedIn()) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin';
          this.router.navigate([returnUrl]); // Navigate to admin dashboard
        }
      },
      error: (err) => {
        this.formError = 'Login failed. Please try again.';
      },
    });
  }
}