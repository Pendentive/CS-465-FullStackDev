import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

import { Page } from '../interfaces/page';
import { GalleryHeroVert } from '../interfaces/gallery-hero-vert';
import { TypeIntro } from '../interfaces/type-intro';
import { GalleryGrid } from '../interfaces/gallery-grid';
import { GalleryBanner } from '../interfaces/gallery-banner';
import { RepeaterMenu } from '../interfaces/repeater-menu';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl; // Use environment variable

  constructor(private http: HttpClient) { }

  // Template request methods
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  // Image methods 
  getImages(): Observable<Image[]> {
    return this.get<Image[]>('images');
  }

  // Page methods
  getPages(): Observable<Page[]> {
    return this.get<Page[]>('pages');
  }

  getPage(id: string): Observable<Page> {
    return this.get<Page>(`pages/${id}`);
  }

  getPageByIdentifier(identifier: string): Observable<Page> {
    return this.get<Page>(`pages/identifier/${identifier}`);
  }
  
  updatePage(id: string, page: Page): Observable<Page> {
    return this.put<Page>(`pages/${id}`, page);
  }
  
  updatePageByIdentifier(identifier: string, page: Page): Observable<Page> {
    return this.put<Page>(`pages/identifier/${identifier}`, page);
  }

  createPage(page: Page): Observable<Page> {
    return this.post<Page>('pages', page);
  }

  deletePage(id: string): Observable<void> {
    return this.delete<void>(`pages/${id}`);
  }

  // Component methods
  updateComponent(componentType: string, componentId: string, component: any): Observable<any> {
    return this.put<any>(`components/${componentType}/${componentId}`, component);
  }
}