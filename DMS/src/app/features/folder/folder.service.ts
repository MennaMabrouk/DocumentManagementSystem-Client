import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { FolderModel } from './folder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {  

  constructor(private singelton : SingeltonService) { }

  getAllFoldersByUserId(userId: number): Observable<FolderModel[]> 
  {
    return this.singelton.getRequest<FolderModel[]>(`Folder/workspace/${userId}/folders`); 
  }

  GetAllPublicFolders() : Observable<FolderModel[]>
  {
   return this.singelton.getRequest<FolderModel[]>("Folder/public-folders");
       
  }

  GetFolderByFolderId(folderId : number) : Observable<FolderModel>
  {
    return this.singelton.getRequest<FolderModel>(`Folder/${folderId}`);
  }

  CreateFolder(folderData : FolderModel) : Observable<any>
  {
    return this.singelton.postRequest('Folder',folderData);
  }

  UpdateFolder(folderData : FolderModel) : Observable<any>
  {
    return this.singelton.putRequest('Folder',folderData);
  }
 
  DeleteFolder(folderId : number ) : Observable<any>
  {
    return this.singelton.deleteRequest(`Folder/${folderId}`);
  }
}
