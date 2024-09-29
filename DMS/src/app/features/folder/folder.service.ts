import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { FolderModel } from './folder.model';
import { Observable } from 'rxjs';
import { PaginationConfig } from '../../shared/Enums/Pagination.enum';
import { PaginatedResult } from '../../shared/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class FolderService {  

  constructor(private singelton : SingeltonService) { }

  getAllFoldersByUserId(userId: number,
            pageNumber: number = PaginationConfig.DefaultPageNumber,
            pageSize: number = PaginationConfig.DefaultPageSize) 
            : Observable<PaginatedResult<FolderModel>>
  {
    const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.singelton.getRequest<PaginatedResult<FolderModel>>(`Folder/workspace/${userId}/folders${params}`); 
  }

  GetAllPublicFolders(pageNumber: number = PaginationConfig.DefaultPageNumber,
                       pageSize: number = PaginationConfig.DefaultPageSize) 
                       : Observable<PaginatedResult<FolderModel>>
  {
    const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.singelton.getRequest<PaginatedResult<FolderModel>>(`Folder/public-folders${params}`);
       
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
