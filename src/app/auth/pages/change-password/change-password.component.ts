import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  constructor(private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.checkIfDifferent('password')]],
      confirmPassword: ['', [Validators.required, this.matchValues('newPassword')]]
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

}
