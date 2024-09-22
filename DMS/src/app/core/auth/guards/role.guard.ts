import { CanActivateFn } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';
import { inject } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const navigationService = inject(NavigationService);

  const userRole = storageService.getItem('role');
  const expectedRole = route.data?.['role'];
  // console.log("Expceted role" , expectedRole);
  // console.log("user role" , userRole);

  if (expectedRole && expectedRole.includes(userRole)) 
  {
    // console.log("Expceted role" , expectedRole);
    // console.log("user role" , userRole);
    return true
  }

  else
  {
    navigationService.navigateTo('/unauthorized');
    return false;
  }
};
