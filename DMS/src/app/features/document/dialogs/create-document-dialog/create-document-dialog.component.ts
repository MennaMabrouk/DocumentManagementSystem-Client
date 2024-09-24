import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-create-document-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule],
  templateUrl: './create-document-dialog.component.html',
  styleUrl: './create-document-dialog.component.scss'
})
export class CreateDocumentDialogComponent implements OnInit {

  documentForm!: FormGroup;
  selectedFile!: File;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public document: any,
    private validationService: ValidationService) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      File: ['', Validators.required],
      FolderId: ['', Validators.required],
      Name: [''],

    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.documentForm.get(controlName);
    if (control && control.invalid && control.touched) {
      return this.validationService.getValidationMessage(controlName, control);
    }

    return '';
  }


  onCreate(): void {
    if (this.documentForm.valid && this.selectedFile) {
     const formData = new FormData();

     formData.append('File',this.selectedFile);
     formData.append('FolderId' , this.documentForm.value.FolderId);
     formData.append('Name', this.documentForm.value.Name || this.selectedFile.name);
     this.dialogRef.close(formData);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.documentForm.patchValue({ File: this.selectedFile });
      this.documentForm.get('File')?.updateValueAndValidity();
  }

}
}