
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  editUser(userId: string, model: any) {
    return this.http.put(`${this.baseUrl}/user/${userId}`, model);
  }

  changePassword(userId: number, model:any) {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/user/${userId}/password`, model, { headers });
  }
}













