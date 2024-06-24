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
      NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.checkIfDifferent('OldPassword')]],
      ConfirmNewPassword: ['', [Validators.required, this.matchValues('NewPassword')]]
    });
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { noMatching: true };
    };
  }

  checkIfDifferent(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== control.parent?.get(matchTo)?.value
        ? null
        : { fieldsAreSame: true };
    };
  }

  changePassword() {
    if(this.changePasswordForm.valid && !this.successMessage){
      this.userService.changePassword(this.auth?.user?.id ?? 0,this.changePasswordForm.value).subscribe({
        next: () => {
          this.changePasswordForm.reset();
          this.successMessage = true;
          console.log('Password changed');
        },
        error: (result) => {
          if (typeof result.error === 'string') {
            this.errorMessage = result.error;
          }
        }
      });
      }
    }
}



