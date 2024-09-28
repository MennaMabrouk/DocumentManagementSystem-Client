import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  logErrorResponse(err: any): Observable<never> {
    console.error('An error occurred:', err);

    // Only show alert for specific errors (e.g., server errors 500 or 400 range)
    if (err.status >= 500 || err.status === 400) {
      alert('Something went wrong. Please try again later.');
    }

    return throwError(() => err);
  }
}
