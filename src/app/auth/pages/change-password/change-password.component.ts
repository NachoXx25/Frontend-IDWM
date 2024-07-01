import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../_services/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/_interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';

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
  errors: any[] = []; // Errores
  constructor(private route: Router, private fb: FormBuilder, private userService: UserService, private AuthService: AuthService, private cd: ChangeDetectorRef) { }

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
    this.errors = []; // Reiniciar errores
    if(this.changePasswordForm.valid && !this.successMessage){
      this.userService.changePassword(this.auth?.user?.id ?? 0,this.changePasswordForm.value).subscribe({
        next: (result: any) => {
          this.successMessage = true
          this.changePasswordForm.reset();
          console.log('Contraseña cambiada:', result);
        },
        error: (err: HttpErrorResponse) => { // Si hay un error
          let jsonErrors;

          try {
            jsonErrors = JSON.parse(err.error); // Convertir el error a JSON
            this.errors = []; // Reiniciar errores
            const fieldNames: { [key: string]: string } = {
              NewPassword: 'La contraseña nueva',
              OldPassword: 'La contraseña antigua',
              ConfirmNewPassword: 'La confirmación de la contraseña'
            }; // Nombres de los campos al español

            for (const key in jsonErrors.errors) { // Recorrer los errores
              if (jsonErrors.errors.hasOwnProperty(key)) { // Si tiene la propiedad
                const errorMessages = jsonErrors.errors[key]; // Obtener los mensajes de error
                const fieldName = fieldNames[key] || key; // Obtener el nombre del campo
                for (const message of errorMessages) { // Recorrer los mensajes de error
                  this.errors.push(`Error en ${fieldName}: ${message}`); // Agregar el mensaje de error
                }
              }
            }

          } catch (e) { // Si no se puede convertir a JSON
            this.errors.push(`Error: ${err.error}`); // Agregar el error
            this.cd.detectChanges(); // Detectar cambios
          }
        }
      })

    }
  }
}
