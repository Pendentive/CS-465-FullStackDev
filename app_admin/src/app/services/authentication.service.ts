import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../interfaces/authresponse';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiBaseUrl; // Use environment variable
  private logoutSubject = new Subject<void>(); 
  public logout$ = this.logoutSubject.asObservable(); 

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient
  ) { }

  public getToken(): string {
    return this.storage.getItem('mean-token') ?? '';
  }

  public saveToken(token: string): void {
    //console.log('Saving token:', token); // Log the token being saved
    this.storage.setItem('mean-token', token);
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap((authResp: AuthResponse) => {
        //console.log('Token received:', authResp.token); // Log the token received
        this.saveToken(authResp.token);
      })
    );
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, formData).pipe(
      tap((authResp: AuthResponse) => {
        //console.log('Token received:', authResp.token); // Log the token received
        this.saveToken(authResp.token);
      })
    );
  }

  public logout(): void {
    this.storage.removeItem('mean-token');
    this.logoutSubject.next(); // Emit logout event
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    //console.log('Checking login status, token:', token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        //console.log('Token payload:', payload);
        const isLoggedIn = payload.exp > (Date.now() / 1000);
        //console.log('Is logged in:', isLoggedIn);
        return isLoggedIn;
      } catch (error) {
        console.error('Error parsing token:', error);
        return false;
      }
    } else {
      //console.log('Not logged in: no token');
      return false;
    }
  }

  public getCurrentUser(): User {
    try {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name,
          role: payload.role
        } as User;
      }
    } catch(error) {
      console.error('Error parsing token:', error);
    }
    return {email: '', name: '', role: 'express'};
  }

  public getRole(): string {
    try {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
      }
    } catch(error) {
      console.error('Error parsing token:', error);
    }
    return '';
  }
}