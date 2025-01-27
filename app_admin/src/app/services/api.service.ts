import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryHeroVert } from '../interfaces/gallery-hero-vert';
import { TypeIntro } from '../interfaces/type-intro';
import { GalleryGrid } from '../interfaces/gallery-grid';
import { GalleryBanner } from '../interfaces/gallery-banner';
import { RepeaterMenu } from '../interfaces/repeater-menu';
import { Image } from '../interfaces/image';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/authresponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Authentication methods
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/${endpoint}`, formData);
  }

  // Data fetching methods
  getGalleryHeroVerts(): Observable<GalleryHeroVert[]> {
    return this.http.get<GalleryHeroVert[]>(`${this.apiUrl}/gallery-hero-vert`);
  }

  getTypeIntros(): Observable<TypeIntro[]> {
    return this.http.get<TypeIntro[]>(`${this.apiUrl}/type-intro`);
  }

  updateTypeIntro(typeIntro: TypeIntro): Observable<TypeIntro> {
    return this.http.put<TypeIntro>(`${this.apiUrl}/type-intro/${typeIntro._id}`, typeIntro);
  }

  getGalleryGrids(): Observable<GalleryGrid[]> {
    return this.http.get<GalleryGrid[]>(`${this.apiUrl}/gallery-grid`);
  }

  getGalleryBanners(): Observable<GalleryBanner[]> {
    return this.http.get<GalleryBanner[]>(`${this.apiUrl}/gallery-banner`);
  }

  getRepeaterMenus(): Observable<RepeaterMenu[]> {
    return this.http.get<RepeaterMenu[]>(`${this.apiUrl}/repeater-menu`);
  }

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/images`);
  }
}