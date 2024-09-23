// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ValidationService } from '../../../services/validation.service';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { DocumentModel } from '../../../../features/document/document.model';

// @Component({
//   selector: 'app-create-document-dialog',
//   standalone: true,
//   imports: [MatButtonModule,
//     MatCheckboxModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatDialogModule,
//     ReactiveFormsModule],
//   templateUrl: './create-document-dialog.component.html',
//   styleUrl: './create-document-dialog.component.scss'
// })
// export class CreateDocumentDialogComponent implements OnInit {

//   documentForm! : FormGroup

//   constructor(private validationService : ValidationService,
//     private formBuilder : FormBuilder,
//     private dialogRef: MatDialogRef<CreateDocumentDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public document :  DocumentModel){}

//   ngOnInit(): void {
//     this.documentForm = this.formBuilder.group({
//       File: ['',Validators.required],
//       Name: [''],
//     });
//   }

//   getErrorMessage(controlName: string): string 
//   {
//     const control = this.documentForm.get(controlName);
//     if (control && control.invalid && control.touched)
//     {
//       return this.validationService.getValidationMessage(controlName, control);
//     }
//     return '';
//   }


//   onFileSelect():
//   {
    
//   }
//   onCreate() : void
//   {

//   }
//   onCancel() : void
//   {
//     this.dialogRef.close();
//   }

// }
