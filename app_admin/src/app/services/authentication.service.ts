import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private apiService: ApiService
  ) { }

  public getToken(): string {
    return this.storage.getItem('travlr-token') ?? '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.apiService.login(user, passwd).pipe(
      tap((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
    );
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.apiService.register(user, passwd).pipe(
      tap((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
    );
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    // Return a default user when not logged in
    return { email: '', name: '' } as User;
  }
}