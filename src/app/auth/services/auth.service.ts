import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Auth } from 'src/app/_interfaces/auth';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.apiUrl; // URL de la API
  private currentAuthSource = new BehaviorSubject<Auth | null>(null); // Fuente de datos de la autenticación actual
  currentAuth$ = this.currentAuthSource.asObservable(); // Autenticación actual

  constructor(private http: HttpClient) {}
  /**
   *  Inicia sesión
   * @param model Datos del formulario
   * @returns  Autenticación
   */
  login(model:any){
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }
  /**
   *  Registra un usuario
   * @param model  Datos del formulario
   * @returns  Autenticación
   */
  register(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }
  /**
   *  Establece la autenticación actual
   * @param auth  Autenticación
   */
  setCurrentAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuthSource.next(auth);
  }
  /**
   *  Obtiene la autenticación actual
   * @returns  Autenticación
   */
  getCurrentAuth(): Auth | null {
    const auth = localStorage.getItem('auth');
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }
  /**
   *  Verifica si el usuario está autenticado
   * @returns  Si el usuario está autenticado
   */
  isAuth(): boolean{
    const active = this.getCurrentAuth();
    if(active != null){
      return true;
    }
    else{
      return false;
    }
  }
  /**
   *  Verifica si el usuario es administrador
   * @returns  Si el usuario es administrador
   */
  isAdmin(): boolean {
    const role = this.getRole();
    if(role === 'Admin'){
      return true;
    }
    else{
      return false;
    }
  }
  /**
   *  Obtiene los claims del token
   * @returns  Claims del token
   */
  getClaimsOfToken(): any {
    const auth = this.getCurrentAuth();
    if (auth) {
      const token = auth.token;
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const claims = JSON.parse(decodedPayload);
      return claims;
    }
    return null;
  }
  /**
   *  Obtiene el rol del usuario
   * @returns Rol del usuario
   */
  getRole(): string {
    const claims = this.getClaimsOfToken();
    if (claims) {
      const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return claims[roleKey] || '';
    }
    return '';
  }
  /**
   * Cierra sesión
   */
  logout() {
    localStorage.removeItem('auth');
    this.currentAuthSource.next(null);
  }
}
