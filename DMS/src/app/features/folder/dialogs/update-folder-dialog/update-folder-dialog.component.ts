import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FolderModel } from '../../folder.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-folder-dialog',
  standalone: true,
  imports: [    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  MatIconModule],
  templateUrl: './update-folder-dialog.component.html',
  styleUrl: './update-folder-dialog.component.scss'
})
export class UpdateFolderDialogComponent implements OnInit {

  folderForm! : FormGroup
  
  constructor(private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<UpdateFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public folder : FolderModel) {}

  ngOnInit(): void {
    this.folderForm = this.formBuilder.group({
      Name: [this.folder.Name],
      IsPublic: [this.folder.IsPublic],
    });
  }


  onUpdate(): void {
    if (this.folderForm.valid)
     {
      const hasChanged = 
        this.folderForm.value.Name !== this.folder.Name ||
        this.folderForm.value.IsPublic !== this.folder.IsPublic;
  
      if (hasChanged) 
        {
        const updatedFolder: FolderModel = {
          ...this.folder,
          Name: this.folderForm.value.Name,
          IsPublic: this.folderForm.value.IsPublic
        };

          this.dialogRef.close(updatedFolder);
       } 
       else 
      {
        this.onCancel();
      }
    }
  }
  

onCancel() : void
{
  this.dialogRef.close();
}

}
