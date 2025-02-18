import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {
  getBaseUrl(): string {
    return environment.imageBaseUrl;
  }

  constructImageUrl(imagePath: string): string {
    return `${environment.imageBaseUrl}${imagePath}`;
  }
}