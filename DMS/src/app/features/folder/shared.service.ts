import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isSharedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsShared() : Observable<boolean>
  {
    return this.isSharedSubject.asObservable();
  }

  setIsShared(isShared : boolean) : void
  {
    this.isSharedSubject.next(isShared);
  }
}
