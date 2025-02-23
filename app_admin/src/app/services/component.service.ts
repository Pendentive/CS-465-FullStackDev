import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private apiUrl = environment.apiBaseUrl; // Use environment variable

  constructor(private http: HttpClient, private apiService: ApiService) {}

  updateComponent(componentId: string, update: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateGalleryHeroVert(componentId: string, update: any): Observable<any> {
    // Prepare the data for sending to the API (e.g., formatting, validation)
    const componentType = 'GalleryHeroVert'; // Hardcoded for now, can be made dynamic
    return this.apiService.put<any>(`components/${componentType}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTypeIntro(componentId: string, update: any): Observable<any> {
    // Prepare the data for sending to the API (e.g., formatting, validation)
    const componentType = 'TypeIntro'; // Hardcoded for now, can be made dynamic
    return this.apiService.put<any>(`components/${componentType}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGalleryGrid(componentId: string, update: any): Observable<any> {
    // Prepare the data for sending to the API (e.g., formatting, validation)
    const componentType = 'GalleryGrid'; // Hardcoded for now, can be made dynamic
    return this.apiService.put<any>(`components/${componentType}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRepeaterMenu(componentId: string, update: any): Observable<any> {
    // Prepare the data for sending to the API (e.g., formatting, validation)
    const componentType = 'RepeaterMenu'; // Hardcoded for now, can be made dynamic
    return this.apiService.put<any>(`components/${componentType}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGalleryBanner(componentId: string, update: any): Observable<any> {
    // Prepare the data for sending to the API (e.g., formatting, validation)
    const componentType = 'GalleryBanner'; // Hardcoded for now, can be made dynamic
    return this.apiService.put<any>(`components/${componentType}/${componentId}`, update)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}