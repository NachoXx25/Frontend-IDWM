
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../_interfaces/user';
import { Purchase } from '../_interfaces/purchase';

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
    return this.http.put(`${this.baseUrl}/user/${userId}`, model, { headers });
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

  changeUserState(userId: number, newUserState: string): Observable<string> {

    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/User/${userId}/state/${newUserState}`;

    console.log(`Llamando a la API para cambiar el estado del usuario ${userId} a ${newUserState}`);

    return this.http.put(url, null, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al cambiar el estado del usuario.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al cambiar el estado del usuario:', error);
        return throwError(errorMessage);
      })
    );
  }

  searchUsers(query: string): Observable<User[]> {

    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/user/search?query=${query}`;
    console.log('Llamando a la API para buscar users on query...');
    return this.http.get<User[]>(url, {headers});
  }

  getUsers(): Observable<User[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/`;
    console.log('Llamando a la API para buscar todos los usuarios...');
    return this.http.get<User[]>(url, {headers});
  }

  searchPurchases(query: string): Observable<Purchase[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/purchases/search?query=${query}`;
    console.log('Llamando a la API para buscar compras on query...');
    return this.http.get<Purchase[]>(url, {headers});
  }

  getPurchases(): Observable<Purchase[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/purchases`;
    console.log('Llamando a la API para buscar compras todas...');
    return this.http.get<Purchase[]>(url,{headers});
  }

}













