import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingeltonService {

private apiUrl = "https://localhost:7115/api";
http = inject(HttpClient); 

//GET
getRequest<T>(endpoint : string)  : Observable<T>
{
  return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
}
//POST
postRequest<T>(endpoint : string , payload : any) : Observable<T>
{
  return this.http.post<T>(`${this.apiUrl}/${endpoint}`,payload);
}

//PUT (update)
putRequest<T>(endpoint : string , payload : any) : Observable<T>
{
  return this.http.put<T>(`${this.apiUrl}/${endpoint}`,payload);
}

//DELETE
deleteRequest<T>(endpoint : string) : Observable<T>
{
  return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
}


//GET for document
getBlobRequest(endpoint: string): Observable<Blob> 
{
  return this.http.get(`${this.apiUrl}/${endpoint}`, { responseType: 'blob' });
}


}

