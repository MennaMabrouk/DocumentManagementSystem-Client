import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private storageService : StorageService) { }

  getRole(): string | null {
    return this.storageService.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}
