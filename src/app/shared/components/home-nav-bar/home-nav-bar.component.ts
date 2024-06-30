import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/_interfaces/auth';
import { AuthService } from './../../../auth/services/auth.service';
@Component({
  selector: 'app-home-nav-bar',
  templateUrl: './home-nav-bar.component.html',
  styleUrls: []
})
export class HomeNavBarComponent implements OnInit {
  constructor(private AuthService: AuthService) { }
  auth: Auth | null = null; // Autenticación
  role: string = ''; // Rol
  ngOnInit(): void {
    this.auth = this.AuthService.getCurrentAuth(); // Obtener la autenticación actual
    this.getRole(); // Obtener el rol
  }
  /**
   * Obtiene el rol del servicio
   */
  getRole() {
    this.role = this.AuthService.getRole();
  }
}
