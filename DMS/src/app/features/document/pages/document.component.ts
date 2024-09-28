import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentModel } from '../document.model';
import { ListingComponent } from '../../../shared/components/listing/listing.component';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../shared/item.interface';
import { UpdateDocumentDialogComponent } from '../dialogs/update-document-dialog/update-document-dialog.component';
import { DeleteDocumentDialogComponent } from '../dialogs/delete-document-dialog/delete-document-dialog.component';
import { CreateDocumentDialogComponent } from '../dialogs/create-document-dialog/create-document-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RoleService } from '../../../shared/services/role.service';
import { SharedService } from '../../folder/shared.service';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit {


  documentsData: DocumentModel[] = [];
  isAdmin: boolean = false;
  isShared: boolean = false;

  folderId: number | null = null;
  previewUrl: SafeResourceUrl | null = null;

  constructor(private documentService: DocumentService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer) { }


  ngOnInit(): void {

    // getting folderId from route params
    this.route.params.subscribe(params => {
      this.folderId = +params['folderId']
      this.fetchDocumentsByFolderId(this.folderId);
    });

    this.route.queryParams.subscribe(params => {
      this.isShared = params['isShared'] === 'true';
      console.log('Shared Status:', this.isShared);
    });

    this.roleService.isAdminObservable().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    });

  }


  fetchDocumentsByFolderId(folderId: number | null): void {
    if (folderId !== null) {
      this.documentService.GetDocumentsByFolderId(folderId).subscribe(documents => {
        this.documentsData = documents;
      });
    }
    else {
      console.error('Folder ID is null. Unable to fetch documents.');
    }

  }


  openCreateDocumentDialog(): void {
    const dialogRef = this.dialog.open(CreateDocumentDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UploadDocument(result);
      }
    });

  }


  UploadDocument(formData: FormData) {
    this.documentService.UploadDocument(formData).subscribe(() => {
      this.fetchDocumentsByFolderId(this.folderId)
    });
  }



  openUpdateDialog(documentItem: Item): void {

    const document = documentItem as DocumentModel

    const dialogRef = this.dialog.open(UpdateDocumentDialogComponent, {
      width: '400px',
      data: document
    });

    dialogRef.afterClosed().subscribe(updatedDocument => {
      if (updatedDocument) {
        this.updateDocument(updatedDocument);
      }
    });

  }



  updateDocument(document: DocumentModel) {
    this.documentService.UpdateDocument(document).subscribe(() => {

      this.fetchDocumentsByFolderId(this.folderId);

    });
  }

  openDeleteDialog(documentId: number): void {
    const dialogRef = this.dialog.open(DeleteDocumentDialogComponent, {
      width: '450px',
      height: '175px',
      data: { documentId }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteDocument(documentId);
      }
    }
    )
  }

  deleteDocument(documentId: number) {
    this.documentService.DeleteDocument(documentId).subscribe(() => {
      this.fetchDocumentsByFolderId(this.folderId)
    });
  }


  previewDocument(documentId: number): void {
    this.documentService.PreviewDocument(documentId).subscribe((blob) => {
      const url = URL.createObjectURL(blob); //create URL from the blob
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  closePreview(): void {
    this.previewUrl = null;  // Set preview URL to null to close the iframe
  }
  
  downloadDocument(documentId: number): void {
    this.documentService.GetDocumentById(documentId).subscribe((documentData: DocumentModel) => {
      const documentName = documentData.Name || 'document_' + documentId;

      this.documentService.DownloadDocument(documentId).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = documentName;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    });
  }
}

