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
    map(isLoggedIn => {
      if (isLoggedIn) 
      {
        return true;
      } 
      else 
      {
        navigationService.navigateTo('/login');
        return false;
      }
    })
  );
};
