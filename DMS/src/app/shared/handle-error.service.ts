import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  
logErrorResponse(errorResponse : HttpErrorResponse) : Observable<any>{
  //Client-side errors
  if(errorResponse.status===0)
  {
    console.log(`A client side error occured: ${errorResponse.status} - ${errorResponse.error}`);
  }
  //Back-end errors
  else
  {
    console.log(`A back-end error occured: ${errorResponse.status} - ${errorResponse.error}`);
  }

  return throwError(() => new Error('Something bad happened, try again later'))
  
}
}
