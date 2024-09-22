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
      
      // Check for 401 Unauthorized errors
      if (err.status === 401) {
        navigationService.navigateTo('/unauthorized'); // Redirect if unauthorized
      }

      return throwError(() => err); // Rethrow the error for further handling
    })
  );
};
