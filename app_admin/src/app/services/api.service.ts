import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/api'; // APi URL

  constructor(private http: HttpClient) { }

  getGalleryHeroVerts(): Observable<GalleryHeroVert[]> {
    return this.get<GalleryHeroVert[]>('gallery-hero-vert');
  }

  getTypeIntros(): Observable<TypeIntro[]> {
    return this.get<TypeIntro[]>('type-intro');
  }

  getGalleryGrids(): Observable<GalleryGrid[]> {
    return this.get<GalleryGrid[]>('gallery-grid');
  }

  getGalleryBanners(): Observable<GalleryBanner[]> {
    return this.get<GalleryBanner[]>('gallery-banner');
  }

  getRepeaterMenus(): Observable<RepeaterMenu[]> {
    return this.get<RepeaterMenu[]>('repeater-menu');
  }

  getImages(): Observable<Image[]> {
    return this.get<Image[]>('images');
  }

  // Page fetching methods
  getPages(): Observable<Page[]> {
    return this.get<Page[]>('pages');
  }

  getPage(id: string): Observable<Page> {
    return this.get<Page>(`pages/${id}`);
  }

  getPageByIdentifier(identifier: string): Observable<Page> {
    return this.get<Page>(`pages/identifier/${identifier}`);
  }

  createPage(page: Page): Observable<Page> {
    return this.post<Page>('pages', page);
  }

  updatePage(id: string, page: Page): Observable<Page> {
    return this.put<Page>(`pages/${id}`, page);
  }

  updatePageByIdentifier(identifier: string, page: Page): Observable<Page> {
    return this.put<Page>(`pages/identifier/${identifier}`, page);
  }

  updateComponent(componentType: string, componentId: string, component: any): Observable<any> {
    return this.put<any>(`components/${componentType}/${componentId}`, component);
  }

  deletePage(id: string): Observable<void> {
    return this.delete<void>(`pages/${id}`);
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, this.getHeaders());
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, this.getHeaders());
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, this.getHeaders());
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, this.getHeaders());
  }

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('mean-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers: headers };
  }
}