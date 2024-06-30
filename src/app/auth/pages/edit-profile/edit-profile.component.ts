import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/_interfaces/auth';

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
  constructor(private router: Router, private fb: FormBuilder, private UserService: UserService, private authService: AuthService) { }

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
    this.errorMessage = ''; // Reiniciar mensajes
    this.successMessage = false; // Reiniciar mensajes
    this.UserService.editUser(this.auth?.user?.id ?? 0, this.editProfileForm.value)
    .then((result) => {
      this.successMessage = true
      this.editProfileForm.reset();
      console.log('Perfil cambiado: ', result);
      })
      .catch((error) => { // Capturar errores
        this.errorMessage = error;
        console.error('Error: ', error);
      });
  }

}
