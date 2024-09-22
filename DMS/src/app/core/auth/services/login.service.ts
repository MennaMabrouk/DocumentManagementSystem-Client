import { Injectable } from '@angular/core';
import { LoginUserModel } from '../models/login-user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SingeltonService } from '../../../shared/services/singelton.service';
import { StorageService } from '../../../shared/services/storage.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UserService } from '../../../features/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userChange$ : BehaviorSubject<{ isLoggedIn: boolean, role: string | null }>;

  constructor(private singelton : SingeltonService,
              private storage : StorageService,
              private navigationService : NavigationService,
              private userService : UserService) 
              {
                this.userChange$ = new BehaviorSubject({
                  isLoggedIn: !!this.storage.getItem('token'),
                  role: this.storage.getItem('role')
                });
              
              }



  loginUser(loginUserDto: LoginUserModel): Observable<any> {
    return this.singelton.postRequest<any>('User/login', loginUserDto).pipe(
      map((response) => {
        this.storeToken(response.token, response.expiration, response.role);
        //  console.log("login service role res");
        //  console.log(response.role);

        this.userService.getUserId().subscribe({
          next: (userId) => {
            console.log('Fetched User ID:', userId);
          },
          error: (err) => {
            console.error('Failed to fetch user ID', err);
          }
        });
        
        this.userChange$.next({ isLoggedIn: true, role: response.role })
        return response;
      })
    );
  }

  private storeToken(token: string, expiration: string, role: string): void {
    this.storage.setItem('token', token);
    this.storage.setItem('expiration', expiration);
    this.storage.setItem('role', role);
    console.log('Stored Role:', role); 


  }

  logout() : void
  { 
    
    this.storage.removeItem('token');
    this.storage.removeItem('expiration');
    this.storage.removeItem('role');
    this.userService.clearUserDetails();
    this.userChange$.next({ isLoggedIn: false, role: null }); // Update BehaviorSubject
    this.navigationService.navigateTo('/login');

  }


}

