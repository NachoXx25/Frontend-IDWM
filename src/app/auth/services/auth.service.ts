import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Auth } from 'src/app/_interfaces/auth';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl;
  private currentAuthSource = new BehaviorSubject<Auth | null>(null);
  currentAuth$ = this.currentAuthSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model:any){
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  setCurrentAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuthSource.next(auth);
  }

  getCurrentAuth(): Auth | null {
    const auth = localStorage.getItem('auth');
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }

  isAuth(): boolean{
    const active = this.getCurrentAuth();
    if(active != null){
      return true;
    }
    else{
      return false;
    }
  }

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

  getRole(): string {
    const claims = this.getClaimsOfToken();
    if (claims) {
      const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return claims[roleKey] || '';
    }
    return '';
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentAuthSource.next(null);
  }
}
