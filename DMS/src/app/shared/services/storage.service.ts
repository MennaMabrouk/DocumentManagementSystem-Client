import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key : string , value : string) : void
  {
    localStorage.setItem(key,value);
  }

  getItem(key : string) : string | null
  {
    const value = localStorage.getItem(key);
    if (!value) {
      console.warn(`Missing value for key: ${key}`);
    }
    return value;
  }

  removeItem(key : string) : void
  {
    localStorage.removeItem(key);
  }
}
