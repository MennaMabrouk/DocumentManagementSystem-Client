import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../../../shared/services/validation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginUserModel } from '../../models/login-user.model';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatIconModule
            ,MatButtonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form! : FormGroup;
  
  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(
    private formBuilder : FormBuilder,
    private validationService : ValidationService,
    private loginService : LoginService,
    private navigationService : NavigationService) { }


   // Initialize form 
   private initializeForm() : void
   {
     this.form = this.formBuilder.group({
       Email: ['' , [Validators.required,Validators.email]],
       Password: ['' , [Validators.required,Validators.minLength(8)]],
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

onSubmit(): void {
  if (this.form.valid) 
    {
    const loginData: LoginUserModel = this.form.value;

    this.loginService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('Logged successfully:', response);
        this.navigationService.navigateTo('/dashboard');
      },
    });
  }
}
}
