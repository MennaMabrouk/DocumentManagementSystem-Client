import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const loginService = inject(LoginService);
  const navigationService = inject(NavigationService);

  return loginService.getLoginStatus().pipe(
    map((isLoggedIn) => {
      if (loginService.isLogoutInProgress()) {
        return false; // Prevent further checks during logout
      }

      if (isLoggedIn) {
        return true; // User is authenticated, allow access
      } else {
        navigationService.navigateTo('/login'); // Redirect to login if not authenticated
        return false;
      }
    })
  );
};
