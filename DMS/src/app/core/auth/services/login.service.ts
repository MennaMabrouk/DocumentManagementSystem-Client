import { inject, Injectable } from '@angular/core';
import { SingeltonService } from '../../../shared/singelton.service';
import { LoginUserModel } from '../models/login-user.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

singelton = inject(SingeltonService);
router = inject(Router);

loginUser(loginUserDto: LoginUserModel): Observable<any> {
  return this.singelton.postRequest<any>('User/login', loginUserDto).pipe(
    map((response) => {
      
      this.storeToken(response.token,response.expiration, response.role);
      return response;
    })
  );
}

private storeToken(token : string , expiration : string, role : string) : void
{
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expiration);
  localStorage.setItem('role',role);
}

}

