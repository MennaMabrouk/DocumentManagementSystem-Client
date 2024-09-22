import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidationService } from '../../../../shared/services/validation.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { RegisterUserModel } from '../../models/register-user.model';
import { NavigationService } from '../../../../shared/services/navigation.service';
import {MatRadioModule} from '@angular/material/radio';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    RouterModule,
    MatRadioModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {

  form! : FormGroup;
 

  constructor(
    private formBuilder : FormBuilder,
    private validationService : ValidationService,
    private registerService : RegisterService,
    private navigationService : NavigationService) { }

    ngOnInit(): void {
      this.initializeForm();
    }


   // Initialize form 
private initializeForm() : void
{
  this.form = this.formBuilder.group({
    Username : ['' , Validators.required],
    Email: ['' , [Validators.required,Validators.email]],
    Nid : ['',[Validators.required, Validators.pattern(/^\d{14}$/)]],
    Gender: [null,[Validators.required,Validators.maxLength(6)]],
    WorkspaceName : ['',[Validators.required]],
    PhoneNumber: [null, [Validators.required,Validators.pattern(/^(?:\+20(11|10|15)\d{8}|(011|010|015)\d{8})$/)]],
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

onSubmit(): void {
  if (this.form.valid) {
    const registerData: RegisterUserModel = this.form.value;

    this.registerService.registerUser(registerData).subscribe({
      next: (response) => {
        console.log('Registration response:', response);
        this.navigationService.navigateTo('/login');

      },
      error: (error) => {
        console.error('Registration failed:', error);
        if (error.error && error.error.Errors) {
          console.log('Validation errors:', error.error.Errors);
        }
      }
    });
  }
}






}