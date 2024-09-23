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
  return this.singleton.getRequest(`Document/{$folderId}`)
}

// GetDocumentMetaDataByDocumentId(documentId : number) : Observable<DocumentModel>
// {
//   return this.singleton.getRequest()
// }

// PreviewDocument(documentId : number) : Observable<

}
