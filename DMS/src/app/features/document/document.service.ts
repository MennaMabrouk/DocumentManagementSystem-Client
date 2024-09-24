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
  return this.singleton.getRequest<DocumentModel[]>(`Document/documents/${folderId}`)
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
