import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from './user.model';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userIdSubject : BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(private singleton : SingeltonService,
            private storageService : StorageService) { }

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
    if (this.userIdSubject.getValue() !== null) 
    {
      return this.userIdSubject.asObservable();

    }
   else
   {
      return new Observable(observer => {
        this.fetchUserId().subscribe({
          next: (response: any) => {
            this.userIdSubject.next(response.userId);
            observer.next(this.userIdSubject.getValue()); 
            observer.complete();
          },

        });
      });
    }
  }

  clearUserDetails(): void {
    this.userIdSubject.next(null);
  }
  


  getRole(): string | null
  {
    return this.storageService.getItem('Role'); 
  }

  isAdmin(): boolean 
  {
    return this.getRole() === 'Admin'; 
  }
}
