import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/_interfaces/auth';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  auth: Auth | null = null;
  changePasswordForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: boolean = false;
  constructor(private route: Router, private fb: FormBuilder, private userService: UserService, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.auth = this.AuthService.getCurrentAuth();
  }


  initializeForm() {
    this.changePasswordForm = this.fb.group({
      OldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.checkIfDifferent('OldPassword'), this.mustBeAlphanumeric('NewPassword')]],
      ConfirmNewPassword: ['', [Validators.required, this.matchValues('NewPassword'), this.mustBeAlphanumeric('ConfirmNewPassword')]]
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value? null: { noMatching: true };
    };
  }

  checkIfDifferent(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== control.parent?.get(matchTo)?.value
        ? null
        : { fieldsAreSame: true };
    };
  }

  mustBeAlphanumeric(pass: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.parent?.get(pass)?.value
      return value && !/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(value) ? null : { invalidAlphanumeric: true };
    };
  }

  changePassword() {
    this.errorMessage = '';
    this.successMessage = false;
    if(this.changePasswordForm.valid && !this.successMessage){
      this.userService.changePassword(this.auth?.user?.id ?? 0,this.changePasswordForm.value)
      .then((result) => {
        this.successMessage = true
        this.changePasswordForm.reset();
        console.log('Contraseña cambiada:', result);
      })
      .catch((error) => {
        if (error.error && error.error.errors && error.error.errors.NewPassword) {
          this.errorMessage = error.error.errors.NewPassword[0];
          console.error('Error: ', this.errorMessage);
        } else if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
              console.error('Error: ', this.errorMessage);
        } else {
              this.errorMessage = 'Ocurrió un error inesperado.';
        }
      });
    }
  }
}
