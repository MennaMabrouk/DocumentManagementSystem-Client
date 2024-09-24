import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private validationMessages: any;

  constructor(private http : HttpClient)
  { this.loadValidationMessages(); }

  loadValidationMessages() {
    this.http.get<any>('assets/i18n/validation-message.json').subscribe(data => {
      this.validationMessages = data.validation;
    });
  }

  getValidationMessage(controlName : string, control: AbstractControl): string {
    if (!this.validationMessages) {
      return '';  // If messages aren't loaded yet
    }

    if (control.errors) {
      if (control.errors['required']) {
        return this.validationMessages.requiredMessage;
      } else if (control.errors['email']) {
        return this.validationMessages.invalidEmail;
      } else if (control.errors['minlength']) {
        return this.validationMessages.passwordMinLength;
      } else if (control.errors['mustMatch']) {
        return this.validationMessages.mustMatch;
      }  else if (control.errors['pattern']) {
        if(controlName === 'Nid')
        {
          return this.validationMessages.nidPattern;
        }
        else if (controlName === 'PhoneNumber')
        {
          return this.validationMessages.phonePattern;
        }
        else if (controlName === 'Gender')
        {
          return this.validationMessages.genderMaxLength;
        }
      }
      else if (control.errors['maxlength'])
      {
        if (controlName === 'Name')
           {
            return this.validationMessages.nameMaxLength;
          } 
          else if (controlName === 'Version')
             {
             return this.validationMessages.versionMaxLength;
          } 
          else if (controlName === 'Tag')
         {
          return this.validationMessages.tagMaxLength;
        }
      }
      else if(control.errors['min'])
      {
        return this.validationMessages.lockTimeMin;
      }
    }

    return '';
  }

  static mustMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchControl = formGroup.get(matchControlName);

      if (!control || !matchControl) {
        return null; 
      }

      if (control.value !== matchControl.value) {
        matchControl.setErrors({ mustMatch: true });
        return { mustMatch: true };  
      } else {
        matchControl.setErrors(null);  
        return null;  
      }
    };
  }
}
