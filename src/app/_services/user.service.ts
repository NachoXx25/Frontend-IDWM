
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  editUser(userId: number, model: any) {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(
      this.http.put(`${this.baseUrl}/user/${userId}`, model, { headers, responseType: 'text' })
    );
  }

  changePassword(userId: number, model:any) {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return firstValueFrom(
      this.http.put(`${this.baseUrl}/user/${userId}/password`, model, { headers, responseType: 'text' })
    );
  }
}













