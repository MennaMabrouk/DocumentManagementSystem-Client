import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-document-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-document-dialog.component.html',
  styleUrl: './delete-document-dialog.component.scss'
})
export class DeleteDocumentDialogComponent {

  constructor(public dialogRef : MatDialogRef<DeleteDocumentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data :{ documentId : number}) {}
  
  onCancel() : void
  {
    this.dialogRef.close();
  }

  onConfirm() : void
  {
    this.dialogRef.close(true);
  }
  
}
