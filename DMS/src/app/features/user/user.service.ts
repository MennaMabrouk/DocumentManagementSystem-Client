import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { UserModel } from './user.model';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  
  constructor(private singleton: SingeltonService,
    private storage : StorageService) { }

  // fetchUserId(): Observable<any> 
  // {
  //   return this.singleton.getRequest("User/details");
  // }

  fetchUserId(): Observable<any> {
    const token = this.storage.getItem('token');
    if (!token) {
      return of(null); // Return empty observable if no token is available
    }

    return this.singleton.getRequest("User/details").pipe(
      catchError(() => of(null)) // Handle errors gracefully
    );
  }


  // getUserId(): Observable<number | null> 
  // {
  //   if (this.userIdSubject.getValue() !== null)
  //   {
  //     return this.userIdSubject.asObservable();
  //   }
  //   else {
  //     return new Observable(observer => {
  //       this.fetchUserId().subscribe({
  //         next: (response: any) => {
  //           this.userIdSubject.next(response.userId);
  //           observer.next(this.userIdSubject.getValue());
  //           observer.complete();
  //         },

  //       });
  //     });
  //   }
  // }
  getUserId(): Observable<number | null> {
    if (this.userIdSubject.getValue() !== null) {
      // Return cached user ID if available
      return this.userIdSubject.asObservable();
    } else {
      // Fetch user ID from API and cache it
      return new Observable(observer => {
        this.fetchUserId().subscribe({
          next: (response: any) => {
            if (response?.userId) {
              this.userIdSubject.next(response.userId); // Cache user ID
            }
            observer.next(this.userIdSubject.getValue());
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
      });
    }
  }


  clearUserDetails(): void 
  {
    this.userIdSubject.next(null);
  }


  // getUserById(userId : number) : Observable<UserModel>
  // {
  //   return this.singleton.getRequest<UserModel>(`User/${userId}`);
  // }

  getUserById(userId: number): Observable<UserModel> {
    const token = this.storage.getItem('token');
    if (!token) {
      return of(null as unknown as UserModel);
    }

    return this.singleton.getRequest<UserModel>(`User/${userId}`).pipe(
      catchError(() => of(null as unknown as UserModel))
    );
  }

}
