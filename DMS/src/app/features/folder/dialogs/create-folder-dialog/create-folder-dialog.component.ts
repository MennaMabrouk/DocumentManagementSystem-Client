import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FolderModel } from '../../folder.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-create-folder-dialog',
  standalone: true,
  imports: [    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule],
  templateUrl: './create-folder-dialog.component.html',
  styleUrl: './create-folder-dialog.component.scss'
})
export class CreateFolderDialogComponent implements OnInit {
  
  folderForm! : FormGroup
  
  constructor(private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<CreateFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public folder : FolderModel,
    private validationService : ValidationService) {}

  ngOnInit(): void {
    this.folderForm = this.formBuilder.group({
      Name: ['',[Validators.required,Validators.maxLength(50)]],
      IsPublic: [false],
    });
  }

  getErrorMessage(controlName: string): string 
{
  const control = this.folderForm.get(controlName);
  if (control && control.invalid && control.touched)
  {
    return this.validationService.getValidationMessage(controlName, control);
  }
  
  return '';
}

onCreate() : void
{
  if(this.folderForm.valid)
  {
    this.dialogRef.close(this.folderForm.value);
  }
}
onCancel() : void
{
  this.dialogRef.close();
}
}
