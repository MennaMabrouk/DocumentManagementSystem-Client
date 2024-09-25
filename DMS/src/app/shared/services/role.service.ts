import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleSubject: BehaviorSubject<string | null>;


  constructor(private storageService : StorageService) 
  {
    const storedRole = this.storageService.getItem('role');
    this.roleSubject = new BehaviorSubject<string | null>(storedRole);
  }

  getRole(): Observable<string | null> 
  {
    return this.roleSubject.asObservable();
  }

  setRole(role: string | null): void 
  {
    if (role)
    {
      this.storageService.setItem('role', role);
    } 
    else 
    {
      this.storageService.removeItem('role');
    }
    // Update the BehaviorSubject with the new role
    this.roleSubject.next(role);
  }

    // Synchronous method to check if the current user is admin
  isAdmin(): boolean 
  {
    return this.roleSubject.getValue() === 'Admin';
  }

  isAdminObservable(): Observable<boolean> 
  {
    return this.getRole().pipe(
      map(role => role === 'Admin')  
    );
  }
}
