import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-folder-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-folder-dialog.component.html',
  styleUrl: './delete-folder-dialog.component.scss'
})
export class DeleteFolderDialogComponent {

  constructor(public dialogRef : MatDialogRef<DeleteFolderDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data :{ folderId : number}) {}
  
  onCancel() : void
  {
    this.dialogRef.close();
  }

  onConfirm() : void
  {
    this.dialogRef.close(true);
  }
  
  }
