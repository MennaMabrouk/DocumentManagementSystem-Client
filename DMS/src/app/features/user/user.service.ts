import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { Observable, of } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId : number | null = null;

  constructor(private singleton : SingeltonService) { }

  fetchUserId() : Observable<any>
  {
    return this.singleton.getRequest("User/details");
  }

  //For Admin
  getAllUsers(): Observable<UserModel[]>
  {
    return this.singleton.getRequest<UserModel[]>('User');
  }


  getUserId(): Observable<number | null> {
    if (this.userId !== null) 
    {
      return of(this.userId);

    }
   else
   {
      return new Observable(observer => {
        this.fetchUserId().subscribe({
          next: (response: any) => {
            this.userId = response.userId;
            observer.next(this.userId); 
            observer.complete();
          },
          error: (err) => {
            console.error('Failed to fetch user ID', err);
            observer.error(err); 
          }
        });
      });
    }
  }

  clearUserDetails(): void {
    this.userId = null;
  }
  

}
