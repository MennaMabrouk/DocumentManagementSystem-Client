import { Injectable } from '@angular/core';
import { SingeltonService } from '../../shared/services/singelton.service';
import { Observable } from 'rxjs';
import { DocumentModel } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private singleton :SingeltonService) { }

GetDocumentsByFolderId(folderId : number) : Observable<DocumentModel[]>
{
  return this.singleton.getRequest<DocumentModel[]>(`Document/${folderId}`)
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

// PreviewDocument(documentId : number) : Observable<>
// {
//   return this.singleton.getRequest(`Document/Preview/${documentId}`);
// }

// UploadDocument(documentData : FormData) : Observable<any>
// {
//   return this.singleton.postRequest('Document/Upload',documentData);
// }

// DownloadDocument(documentId : number) : Observable<>
// {
//   return this.singleton.getRequest(`Document/Download/${documentId}`);
// }
}
