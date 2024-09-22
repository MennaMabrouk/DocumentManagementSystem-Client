import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  logErrorResponse(err: any): Observable<never> {
    console.error('An error occurred:', err);  
    alert('Something went wrong. Please try again later.');  

    return throwError(() => err); 
  }
}
