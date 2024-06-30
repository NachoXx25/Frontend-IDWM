import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { productDto } from '../_interfaces/productDto';
import { ProductType } from '../_interfaces/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchProducts(query: string): Observable<productDto[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/product/search?query=${query}`;

    console.log('Llamando a la API para buscar compras on query...');
    return this.http.get<productDto[]>(url, {headers});
  }

  getProducts(): Observable<productDto[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
    if(!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/product/`;

    console.log('Llamando a la API para buscar compras todas...');
    return this.http.get<productDto[]>(url, {headers});
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
        let errorMessage = 'Error desconocido al eliminar producto';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al eliminar producto 2:', error);
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

  getProductTypes(): Observable<ProductType[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/product/types`; // Asegúrate de usar la URL correcta del endpoint

    console.log('Llamando a la API para obtener tipos de productos...');

    return this.http.get<ProductType[]>(url, { headers }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al obtener los tipos de productos.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al obtener tipos de productos:', error);
        return throwError(errorMessage);
      })
    );
  }

}
