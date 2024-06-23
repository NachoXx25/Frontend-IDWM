import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { productDto } from '../_interfaces/productDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchProducts(query: string): Observable<productDto[]> {
    const url = `${this.baseUrl}/product/search?query=${query}`;

    console.log('Llamando a la API para buscar compras on query...');
    return this.http.get<productDto[]>(url);
  }

  getProducts(): Observable<productDto[]> {

    const url = `${this.baseUrl}/product/`;

    console.log('Llamando a la API para buscar compras todas...');
    return this.http.get<productDto[]>(url);
  }

  delProducts(id: number): Observable<string>{
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/product/${id}`;

    console.log('Llamando a la API para eliminar producto');
    return this.http.delete(url, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al cambiar el estado del usuario.';
        if (error.error instanceof ErrorEvent) {
          // Error de red u otro error del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // El backend devolvió un código de error, pero error.error es un texto
          errorMessage = error.error; // Aquí asignarías el mensaje de texto directamente
        }
        console.error('Error al cambiar el estado del usuario:', error);
        return throwError(errorMessage);
      })
    )
  }

  editProduct(id: number, productData: FormData): Observable<string> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/product/${id}`;

    console.log(`Llamando a la API para editar producto con ID ${id}`);

    return this.http.put(url, productData, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al editar el producto.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al editar el producto:', error);
        return throwError(errorMessage);
      })
    );
  }

  addProduct(productData: FormData): Observable<string> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}/product/`;

    console.log('Llamando a la API para agregar producto...');

    return this.http.post(url, productData, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al agregar el producto.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al agregar el producto:', error);
        return throwError(errorMessage);
      })
    );
  }
}
