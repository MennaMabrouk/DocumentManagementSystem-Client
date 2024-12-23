import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../../../shared/services/role.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const roleService = inject(RoleService);
  const navigationService = inject(NavigationService);
  const loginService = inject(LoginService);

  const expectedRole = route.data?.['role'];

  return roleService.getRole().pipe(
    map((userRole) => {
      if (loginService.isLogoutInProgress()) {
        return false;
      }

      if (expectedRole && expectedRole.includes(userRole)) {
        return true;
      } else {
        // Redirect to login if the role doesn't match
        navigationService.navigateTo('/login');
        return false;
      }
    })
  );
};
