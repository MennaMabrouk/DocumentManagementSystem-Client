import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DocumentModel } from '../../../../features/document/document.model';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-update-document-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  MatIconModule
  ],
  templateUrl: './update-document-dialog.component.html',
  styleUrl: './update-document-dialog.component.scss'
})
export class UpdateDocumentDialogComponent implements OnInit{

  documentForm! : FormGroup
  
  constructor(private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<UpdateDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public document : DocumentModel,
     private validationService : ValidationService) {}


  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      Name: [this.document.Name],
      Version: [this.document.Version],
      Tag : [this.document.Tag]
    });
    }


    
  onUpdate(): void {
    if (this.documentForm.valid)
     {
      const hasChanged = 
        this.documentForm.value.Name !== this.document.Name ||
        this.documentForm.value.Version !== this.document.Version || 
        this.documentForm.value.Tag !== this.document.Tag;
  
      if (hasChanged) 
        {
        const updatedDocument: DocumentModel = {
          ...this.document,
          Name: this.documentForm.value.Name,
          Version: this.documentForm.value.Version,
          Tag : this.documentForm.value.Tag
        };

          this.dialogRef.close(updatedDocument);
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


// getErrorMessage(controlName: string): string 
// {
//   const control = this.documentForm.get(controlName);
//   if (control && control.invalid && control.touched)
//   {
//     return this.validationService.getValidationMessage(controlName, control);
//   }
  
//   return '';
// }

}
