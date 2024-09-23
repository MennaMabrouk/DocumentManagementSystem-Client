import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentModel } from '../document.model';
import { ListingComponent } from '../../../shared/components/listing/listing.component';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [ListingComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit{


  documentsData : DocumentModel[] = [];

constructor(private documentService : DocumentService,
           private dialog : MatDialog) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  fetchDocumentsByFolderId(folderId : number | null) : void
  {
    if(folderId !==null)
      {
        this.documentService.GetDocumentsByFolderId(folderId).subscribe(documents => {
          this.documentsData = documents;
        });
      }
      else
      {
        console.error('Folder ID is null. Unable to fetch documents.');
      }

  }

  // fetchDocumentById(documentId : number) : void
  // {
  //   this.documentService.GetDocumentById(documentId).subscribe(document =>
  //   {

  //   }
  //   )
  // }


  
// openCreateFolderDialog() : void
// {
//   const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
//     width: '400px'
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result)
//      {
//       const newFolder : FolderModel = {
//         ...result,
//         CreationDate : new Date(),
//         FolderId  : 0
//       };

//       this.createFolder(newFolder); 
//     }
//     });

// }


// createFolder(folder : FolderModel)
// {
//   this.folderService.CreateFolder(folder).subscribe(()=>
//   {
//     this.userService.getUserId().subscribe(userId => {
//       this.fetchFolders(userId); 
//     });
//   });

// }



// openUpdateDialog(folderItem: Item): void {

//   const folder = folderItem as FolderModel
  
//     const dialogRef = this.dialog.open(UpdateFolderDialogComponent, {
//       width: '400px',
//       data: folder
//     });

//     dialogRef.afterClosed().subscribe(updatedFolder => {
//       if (updatedFolder)
//      {
//         this.updateFolder(updatedFolder); 
//       }
//     });

// }



// updateDocument(document : DocumentModel)
// {
//   this.documentService.UpdateDocument(document).subscribe(()=>
//   {

//       this.fetchDocumentsByFolderId();
    
//   });
// }

// openDeleteDialog(folderId : number) : void
// {
//   const dialogRef = this.dialog.open(DeleteFolderDialogComponent,{
//     width: '600px',
//     height:'150px',
//     data: {folderId}
//   });

//   dialogRef.afterClosed().subscribe(confirmed =>
//   {
//     if(confirmed)
//     {
//       this.deleteFolder(folderId);
//     }
//   }
//   )
// }

// deleteDocument(documentId : number) {
//   this.documentService.DeleteDocument(documentId).subscribe(() => {
//       this.fetchDocumentsByFolderId()
//   });
// }





}
