import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../_services/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/_interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: []
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup = new FormGroup({}); // Formulario de edición de perfil
  genderOptions: { value: string; text: string }[] = [
    { value: '1', text: 'Masculino' },
    { value: '2', text: 'Femenino' },
    { value: '3', text: 'Prefiero no decirlo' },
    { value: '4', text: 'Otro' },
  ]; // Opciones de género
  errorMessage: string = ''; // Mensaje de error
  successMessage: boolean = false; // Mensaje de éxito
  auth: Auth | null = null; // Autenticación
  errors: any[] = []; // Errores
  constructor(private router: Router, private fb: FormBuilder, private UserService: UserService, private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicializar el formulario
    this.auth = this.authService.getCurrentAuth(); // Obtener la autenticación actual
  }
  /**
   *  Inicializa el formulario
   */
  initializeForm() {
    this.editProfileForm = this.fb.group({
      name: ['', [Validators.minLength(8), Validators.maxLength(255) ]],
      birthday: ['', [this.validateDate() ]],
      genderId: [null],
    });
  }

  /**
   *  Valida la fecha
   * @returns  Si la fecha es válida
   */
  validateDate(): ValidatorFn {
    return (control: AbstractControl) => {
      const date = control.value;

      if (!date) {
        return null;
      }

      const datePattern =
        /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;

      if (!datePattern.test(date)) {
        return { invalidDateFormat: true };
      }

      const [day, month, year] = date.split('/').map(Number);

      const dateObj = new Date(year, month - 1, day);

      const today = new Date();
      if (dateObj >= today) {
        return { futureDate: true };
      }

      return null;
    };
  }
  /**
   * Edita el perfil
   */
  editProfile() {
    this.errors = []; // Reiniciar errores
    this.errorMessage = ''; // Reiniciar mensajes
    this.successMessage = false; // Reiniciar mensajes
    this.UserService.editUser(this.auth?.user?.id ?? 0, this.editProfileForm.value).subscribe({
      next: (result: any) => {
        this.successMessage = true
        this.editProfileForm.reset();
        console.log('Perfil cambiado:', result);
      },
      error: (err: HttpErrorResponse) => {
        let jsonErrors;

          try {
            jsonErrors = JSON.parse(err.error); // Convertir el error a JSON
            this.errors = []; // Reiniciar errores
            const fieldNames: { [key: string]: string } = {
              name: 'El nombre',
              birthday: 'La fecha de nacimiento',
              genderId: 'El género',
            }; // Nombres de los campos al español

            for (const key in jsonErrors.errors) { // Recorrer los errores
              if (jsonErrors.errors.hasOwnProperty(key)) { // Si tiene la propiedad
                const errorMessages = jsonErrors.errors[key]; // Obtener los mensajes de error
                const fieldName = fieldNames[key] || key; // Obtener el nombre del campo
                for (const message of errorMessages) { // Recorrer los mensajes de error
                  this.errors.push(`${message}`); // Agregar el mensaje de error
                }
              }
            }

          } catch (e) { // Si no se puede convertir a JSON
            this.errors.push(`Error: ${err.error}`); // Agregar el error
            this.cd.detectChanges(); // Detectar cambios
          }
      },
    });
  }
}
