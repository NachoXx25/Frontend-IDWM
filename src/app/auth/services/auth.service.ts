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

  logout() {
    localStorage.removeItem('auth');
    this.currentAuthSource.next(null);
  }
}
