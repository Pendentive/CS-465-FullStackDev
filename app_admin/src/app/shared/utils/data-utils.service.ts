import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtilsService {

  constructor() { }

  // Convert Date to string format YYYY-MM-DD
  formatDate(date: Date): string {
    return date.toISOString().substring(0,10); 
  }
  
  // Convert a string or date to ISO 8601 format
  convertToISO(date: string | Date): string {
    return new Date(date).toISOString();
  }

}
