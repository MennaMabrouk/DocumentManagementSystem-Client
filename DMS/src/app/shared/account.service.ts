import { inject, Injectable } from '@angular/core';
import { SingeltonService } from './singelton.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  singelton = inject(SingeltonService);

  GetLoggedInInfo(): Observable<any> {
    return this.singelton.getRequest<any>("User/get-loggedin-info");
  }
}
