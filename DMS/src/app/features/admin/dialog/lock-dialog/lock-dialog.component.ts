import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-lock-dialog',
  standalone: true,
  imports: [MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './lock-dialog.component.html',
  styleUrl: './lock-dialog.component.scss'
})
export class LockDialogComponent implements OnInit {

  adminForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private validationService: ValidationService) { }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      lockTime: [1, Validators.min(1)],
      timeUnit: ['hours']
    });
  }

  getErrorMessage(controlName: string): string 
  {
    const control = this.adminForm.get(controlName);
    if (control && control.invalid && control.touched) {
      return this.validationService.getValidationMessage(controlName, control);
    }

    return '';
  }


  onSubmit()
  {
    if (this.adminForm.valid) 
    {
      const lockTime = this.adminForm.value.lockTime || 1;
      const timeUnit = this.adminForm.value.timeUnit || 'hours';
      this.dialogRef.close({ lockTime, timeUnit });
    }
  }


  onCancel(): void 
  {
    this.dialogRef.close();
  }

}
