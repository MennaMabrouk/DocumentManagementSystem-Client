import { inject, Injectable } from '@angular/core';
import { SingeltonService } from '../../../shared/singelton.service';
import { RegisterUserModel } from '../models/register-user.model';
import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RegisterService {

singelton = inject(SingeltonService);

registerUser(registerUserDto : RegisterUserModel) : Observable<any>
{
   return  this.singelton.postRequest<RegisterUserModel>('User/register',registerUserDto).pipe(map(
    (response) => Object.values(response)
  ));
}

}
