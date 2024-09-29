import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { Observable } from 'rxjs';
import { DocumentModel } from './document.model';
import { PaginationConfig } from '../../shared/Enums/Pagination.enum';
import { PaginatedResult } from '../../shared/PaginatedResult';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private singleton :SingeltonService) { }

GetDocumentsByFolderId(folderId : number,
                pageNumber: number = PaginationConfig.DefaultPageNumber,
                pageSize: number = PaginationConfig.DefaultPageSize)
                 : Observable<PaginatedResult<DocumentModel>>
{
  const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.singleton.getRequest<PaginatedResult<DocumentModel>>(`Document/documents/${folderId}${params}`)
}

GetDocumentById(documentId : number) : Observable<DocumentModel>
{
  return this.singleton.getRequest<DocumentModel>(`Document/${documentId}`);
}

UpdateDocument(document : DocumentModel) : Observable<any>
{
  return this.singleton.putRequest('Document',document);
}

DeleteDocument(documentId : number ) : Observable<any>
{
  return this.singleton.deleteRequest(`Document/${documentId}`);
}


UploadDocument(documentData : FormData) : Observable<any>
{
  return this.singleton.postRequest('Document/Upload',documentData);
}

PreviewDocument(documentId : number) : Observable<Blob>
{
  return this.singleton.getBlobRequest(`Document/Preview/${documentId}`);
}

DownloadDocument(documentId : number) : Observable<Blob>
{
  return this.singleton.getBlobRequest(`Document/Download/${documentId}`);
}
}
