import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorInterceptor implements HttpInterceptor {

  handleErrorService = inject(HandleErrorService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.handleErrorService.logErrorResponse)
    );
  }

  
}
