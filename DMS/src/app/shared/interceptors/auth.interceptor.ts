import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

     const storageService = inject(StorageService);

      const token = storageService.getItem('token');


      if(token)
      {
        //  console.log("Token from storage: ", token);
        // debugger
        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        
        return next(newRequest);
      }
      // console.log("no token");

      return next(req);
  
};



