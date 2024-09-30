import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HandleErrorService } from '../services/handle-error.service';
import { NavigationService } from '../services/navigation.service';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const handleErrorService = inject(HandleErrorService);
  const navigationService = inject(NavigationService);

  return next(req).pipe(
    catchError(err => {
      // Log the error using your handle error service
      handleErrorService.logErrorResponse(err);
      
      // Handle specific errors like 401 Unauthorized
      if (err.status === 401) {
        navigationService.navigateTo('/unauthorized'); 
        return throwError(() => err); 
      }

      return throwError(() => err); 
    })
  );
};
