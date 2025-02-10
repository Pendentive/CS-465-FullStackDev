// app_admin/src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authenticationService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Unauthorized: Redirect to login page
                    this.authenticationService.logout();
                    this.router.navigate(['/login']);
                } else if (error.status === 403) {
                    // Forbidden: Display an error message
                    console.error('Forbidden:', error);
                    // TODO: display a user-friendly message here
                }
                return throwError(error);
            })
        );
    }
}