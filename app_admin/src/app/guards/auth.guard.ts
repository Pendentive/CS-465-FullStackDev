import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to the login page if not logged in and save the return URL
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}