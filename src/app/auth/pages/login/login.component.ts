import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Auth } from 'src/app/_interfaces/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({}); // Formulario de inicio de sesión
  errorMessage: string = ''; // Mensaje de error
  constructor(private router: Router, private AuthService: AuthService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicializar el formulario
  }
  /**
   * Inicializa el formulario
   */
  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }
  /**
   * Inicia sesión
   */
  login() {
    this.AuthService.login(this.loginForm.value).subscribe({ // Iniciar sesión
      next: () => { // Manejar éxito
        this.router.navigate(['/auth/home']);
      },
      error: (result) => { // Manejar errores
        if (typeof result.error === 'string') {
          this.errorMessage = result.error;
        } else {
          this.errorMessage = 'Intente nuevamente';
        }
      }
    });
    }

}
