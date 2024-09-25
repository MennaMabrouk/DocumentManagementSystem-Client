import { Injectable } from '@angular/core';
import { LoginUserModel } from '../models/login-user.model';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { SingeltonService } from '../../../shared/services/singelton.service';
import { StorageService } from '../../../shared/services/storage.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UserService } from '../../../features/user/user.service';
import { RoleService } from '../../../shared/services/role.service';
import { SharedService } from '../../../features/folder/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private singelton: SingeltonService,
    private storage: StorageService,
    private navigationService: NavigationService,
    private userService: UserService,
    private roleService : RoleService,
    private sharedService : SharedService) {}


  loginUser(loginUserDto: LoginUserModel): Observable<any> 
  {
    return this.singelton.postRequest<any>('User/login', loginUserDto).pipe(
      map((response) => {
        this.storeToken(response.token, response.expiration);
        this.roleService.setRole(response.role);


        this.userService.getUserId().subscribe({
          next: (userId) => {
            console.log('Fetched User ID:', userId);
          },
          error: (err) => {
            console.error('Failed to fetch user ID', err);
          }
        });

        return response;
      }),
      catchError(error => {
        // Handle lockout 
        if (error.status === 403)
        {
          const lockoutMessage = error.error || 'Your account is locked.';
          return throwError(() => new Error(lockoutMessage)); 
        }
        return throwError(() => new Error('Login failed, please try again.'));
      })
    );
  }

  private storeToken(token: string, expiration: string): void
  {
    this.storage.setItem('token', token);
    this.storage.setItem('expiration', expiration);
    // this.storage.setItem('role', role);
  }

  logout(): void 
  {

    this.storage.removeItem('token');
    this.storage.removeItem('expiration');
    // this.storage.removeItem('role');
    this.roleService.setRole(null);
    this.userService.clearUserDetails();
    this.sharedService.setIsShared(false);
    this.navigationService.navigateTo('/login');

  }


}

