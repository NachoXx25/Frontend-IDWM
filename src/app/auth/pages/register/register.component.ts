import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({}); // Formulario de registro
  genderOptions: { value: string; text: string }[] = [
    { value: '1', text: 'Masculino' },
    { value: '2', text: 'Femenino' },
    { value: '3', text: 'Prefiero no decirlo' },
    { value: '4', text: 'Otro' },
  ]; // Opciones de género
  errorMessage: string = ''; // Mensaje de error
  constructor(private router: Router, private AuthService: AuthService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicializar el formulario
  }
  /**
   * Inicializa el formulario
   */
  initializeForm() {
      this.registerForm = this.fb.group({
        rut: ['', [Validators.required, this.validateRut()]],
        name: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ]],
        birthday: ['', [
          Validators.required,
          this.validateDate()
        ]],
        genderId: [null, [Validators.required]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]],
        confirmPassword: ['', [
          Validators.required,
          this.matchValues('password')
        ]]
      });
      //
      this.registerForm.controls['password'].valueChanges.subscribe({
        next: () =>
          this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
      }); // Crear el formulario de registro
  }
  /**
   *  Valida el RUT
   * @returns  Si el RUT es válido
   */
  validateRut(): ValidatorFn {
    return (control: AbstractControl) => {
      const rut = control.value;

      if (!rut) {
        return null;
      }

      const rutPattern = /^[1-9]\d{0,7}-[kK\d]$/;
      if (!rutPattern.test(rut)) {
        return { invalidRut: true };
      }

      const [number, verifier] = rut.split('-');

      let sum = 0;
      let multiplier = 2;

      for (let i = number.length - 1; i >= 0; i--) {
        sum += parseInt(number.charAt(i), 10) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
      }

      let calculatedVerifier: string;
      const modulus = 11 - (sum % 11);

      if (modulus === 11) {
        calculatedVerifier = '0';
      } else if (modulus === 10) {
        calculatedVerifier = 'K';
      } else {
        calculatedVerifier = modulus.toString();
      }

      if (calculatedVerifier.toUpperCase() !== verifier.toUpperCase()) {
        return { invalidRut: true };
      }

      return null;
    };
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
   *  Compara dos campos
   * @param matchTo  Campo a comparar
   * @returns
   */
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { noMatching: true };
    };
  }
  /**
   * Registra un usuario
  */
  register() {
    this.errorMessage = ''; // Limpiar mensaje de error

    this.AuthService.register(this.registerForm.value).subscribe({ // Llamar a la API para registrar un usuario
      next: () => {
        this.router.navigate(['/auth/home']); // Redirigir al inicio
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          this.errorMessage = result.error;
        } else {
          this.errorMessage = 'Intente nuevamente';
        }
      }
    });
  }
}
