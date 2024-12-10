import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  const token = storageService.getItem('token');

  if (req.url.includes('/User/login') || (!token && req.url.includes('/User/details'))) {
    return next(req);
  }

  // Add Authorization header if token exists
  if (token) {
    const newRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(newRequest);
  }

  return next(req);
};
