import { CanActivateFn } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const loginService = inject(LoginService);

  const token = storageService.getItem('token');
  const expiration = storageService.getItem('expiration');

  if(token && expiration)
  {
    const expirationDate = new Date(expiration);
    const currentDate = new Date();

    if(currentDate < expirationDate)
      return true;

    else
    {
      loginService.logout();
      return false;
    }
  }

  else
  {
      loginService.logout();
      return false; // No token or expired
  }



};

