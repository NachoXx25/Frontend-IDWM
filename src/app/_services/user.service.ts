
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/services/auth.service';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  errorMessage: string = 'Ocurrió un error inesperado.';
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  handleError(error: any) {
    if (error.error && error.error.errors && error.error.errors.NewPassword) {
      this.errorMessage = error.error.errors.NewPassword[0];
    }
    else if (error.error && error.error.message) {
      this.errorMessage = error.error.message;
    }
    return throwError(this.errorMessage);
  }

  async changePassword(userId: number, model:any) {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return await firstValueFrom(
      this.http.put(`${this.baseUrl}/user/${userId}/password`, model, { headers, responseType: 'text' }).pipe(catchError(this.handleError))
    );
  }

  async editUser(userId: number, model: any) {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return await firstValueFrom(
      this.http.put(`${this.baseUrl}/user/${userId}`, model, { headers, responseType: 'text' }).pipe(catchError(this.handleError))
    );
  }

}













