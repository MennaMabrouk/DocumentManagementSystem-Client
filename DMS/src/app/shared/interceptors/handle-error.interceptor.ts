import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HandleErrorService } from '../services/handle-error.service';
import { NavigationService } from '../services/navigation.service';
import { LoginService } from '../../core/auth/services/login.service';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handleErrorService = inject(HandleErrorService);
  const navigationService = inject(NavigationService);
  const loginService = inject(LoginService); 

  return next(req).pipe(
    catchError((err) => {
      handleErrorService.logErrorResponse(err);

      // Handle specific errors like 401 Unauthorized
      if (err.status === 401) {
        if (loginService.isLogoutInProgress()) {
        } else {
          navigationService.navigateTo('/login'); // Redirect to login
        }
      }

      // Pass the error to the caller
      return throwError(() => err);
    })
  );
};
