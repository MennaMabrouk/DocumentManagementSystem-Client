import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { UserModel } from '../user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private singelton : SingeltonService) { }


  getAllUsers(): Observable<UserModel[]> {
    return this.singelton.getRequest<UserModel[]>('User');
  }

  lockUser(userId : number , lockTime : number | null = null) : Observable<any>
  {
    const payload = lockTime ? { lockTime } : {};
    return this.singelton.postRequest<any>(`User/lock/${userId}`,payload);
  }

  unlockUser(userId : number) : Observable<any>
  {
    return this.singelton.postRequest<any>(`User/unlock/${userId}`, {});
  } 

}
