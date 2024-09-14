import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidationService } from '../../../../shared/validation.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {

  form! : FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(private formBuilder : FormBuilder, private validationService : ValidationService) { }




   // Initialize form 
private initializeForm() : void
{
  this.form = this.formBuilder.group({
    UserName : ['' , Validators.required],
    Email: ['' , [Validators.required,Validators.email]],
    Nid : ['',[Validators.required, Validators.pattern(/^\d{14}$/)]],
    Gender: [''],
    WorkspaceName : ['',[Validators.required]],
    PhoneNumber: ['', [Validators.pattern(/^(?:\+20(11|10|15)\d{8}|(011|010|015)\d{8})$/)]],
    Password: ['' , [Validators.required,Validators.minLength(8)]],
    ConfirmPassword: ['' , [Validators.required,Validators.minLength(8)]],
  },
{
  validators: ValidationService.mustMatch('Password', 'ConfirmPassword')
});
}

  // Handle the error messages using validation-service
getErrorMessage(controlName: string): string 
{
  const control = this.form.get(controlName);
  if (control && control.invalid && control.touched)
  {
    return this.validationService.getValidationMessage(controlName, control);
  }
  
  return '';
}

  // Reset data in form
resetData(): void 
{
  this.form.reset();
}


}