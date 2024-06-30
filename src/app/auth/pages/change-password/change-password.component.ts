import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/_interfaces/auth';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: []
})
export class ChangePasswordComponent implements OnInit{
  auth: Auth | null = null; // Autenticación
  changePasswordForm: FormGroup = new FormGroup({}); // Formulario de cambio de contraseña
  errorMessage: string = ''; // Mensaje de error
  successMessage: boolean = false; // Mensaje de éxito
  constructor(private route: Router, private fb: FormBuilder, private userService: UserService, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicializar el formulario
    this.auth = this.AuthService.getCurrentAuth(); // Obtener la autenticación actual
  }


  initializeForm() {
    this.changePasswordForm = this.fb.group({
      OldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.checkIfDifferent('OldPassword')]],
      ConfirmNewPassword: ['', [Validators.required, this.matchValues('NewPassword')]]
    }); // Crear el formulario de cambio de contraseña
  }
  /**
   *  Compara dos campos
   * @param matchTo  Campo a comparar
   * @returns  Si los campos coinciden
   */
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value? null: { noMatching: true };
    };
  }
  /**
   *  Verifica si son diferentes
   * @param matchTo  Campo a comparar
   * @returns  Si los campos son diferentes
   */
  checkIfDifferent(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== control.parent?.get(matchTo)?.value
        ? null
        : { fieldsAreSame: true };
    };
  }
  /**
   * Cambia la contraseña
   */
  changePassword() {
    this.errorMessage = ''; // Reiniciar mensajes
    this.successMessage = false; // Reiniciar mensajes para evitar duplicados
    if(this.changePasswordForm.valid && !this.successMessage){
      this.userService.changePassword(this.auth?.user?.id ?? 0,this.changePasswordForm.value)
      .then((result) => {
        this.successMessage = true
        this.changePasswordForm.reset();
        console.log('Contraseña cambiada:', result); // Mostrar mensaje en consola
      })
      .catch((error) => { // Capturar errores
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
