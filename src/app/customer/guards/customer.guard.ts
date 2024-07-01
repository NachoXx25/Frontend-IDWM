import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  /**
   *  Verifica si el usuario es un cliente
   * @returns  Si el usuario es un cliente
   */
  canActivate(): boolean {
    if(!this.authService.isAdmin()){
      return true;
    }
    else{
      this.router.navigate(['/auth/home']);
      return false;
    }
  }
}
