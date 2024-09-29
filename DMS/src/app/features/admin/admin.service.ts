import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { UserModel } from '../user/user.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../shared/PaginatedResult';
import { PaginationConfig } from '../../shared/Enums/Pagination.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private singelton : SingeltonService) { }


  getAllUsers(pageNumber: number = PaginationConfig.DefaultPageNumber, pageSize: number = PaginationConfig.DefaultPageSize): Observable<PaginatedResult<UserModel>> {
    const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.singelton.getRequest<PaginatedResult<UserModel>>(`User${params}`);
  }
  
  
  lockUser(userId : number , lockTime : number, timeUnit : string) : Observable<any>
  {
    const payload = {lockTime , timeUnit}
    return this.singelton.postRequest<any>(`User/lock/${userId}`,payload);
  }

  unlockUser(userId : number) : Observable<any>
  {
    return this.singelton.postRequest<any>(`User/unlock/${userId}`, {});
  } 

}
