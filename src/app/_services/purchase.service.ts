import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { PurchaseDto } from '../_interfaces/purchaseDTO';
import { PurchaseInfoDto } from '../_interfaces/purchaseInfo';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }



  makePurchase(purchaseDto: PurchaseDto): Observable<PurchaseInfoDto> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/purchase`;

    return this.http.post<PurchaseInfoDto>(url, purchaseDto, { headers }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al realizar la compra.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al realizar la compra:', error);
        return throwError(errorMessage);
      })
    );
  }
}
