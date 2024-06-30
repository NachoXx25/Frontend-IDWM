import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { productDto } from '../_interfaces/productDto';
import { ProductType } from '../_interfaces/productType';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para gestionar productos
 */
export class ProductService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { } // Constructor del servicio

  /**
   *  Busca productos por nombre
   * @param query  Nombre del producto a buscar
   * @returns  Lista de productos
   */
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
  /**
   *  Busca productos por ID
   * @returns  Lista de productos
   */
  getProducts(): Observable<productDto[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}'); // Obtener el token del localStorage
    const token = auth?.token; // Obtener el token del objeto auth
    if(!token) {  // Si no hay token
      throw new Error('Token not found'); // Lanzar un error
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crear un objeto de cabeceras con el token
    const url = `${this.baseUrl}/product/`; // Crear la URL para llamar a la API

    console.log('Llamando a la API para buscar compras todas...'); // Imprimir en consola para debug
    return this.http.get<productDto[]>(url, {headers}); // Llamar a la API y retornar la respuesta
  }

  /**
   * Elimina un producto por ID
   * @param id  ID del producto a eliminar
   * @returns  Mensaje de éxito o error
   */
  delProducts(id: number): Observable<string>{
    const auth = JSON.parse(localStorage.getItem('auth') || '{}'); // Obtener el token del localStorage
    const token = auth?.token; // Obtener el token del objeto auth

    if (!token) {
      throw new Error('Token no encontrado en el localStorage'); // Lanzar un error si no hay token
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crear un objeto de cabeceras con el token
    const url = `${this.baseUrl}/product/${id}`; // Crear la URL para llamar a la API

    console.log('Llamando a la API para eliminar producto');
    return this.http.delete(url, { headers, responseType: 'text' }).pipe( // Llamar a la API y retornar la respuesta
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al eliminar producto'; // Manejar el error
        if (error.error instanceof ErrorEvent) { // Si el error es de tipo ErrorEvent
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al eliminar producto 2:', error); // Imprimir en consola para debug
        return throwError(errorMessage); // Retornar el error
      })
    )
  }

  /**
   * Edita un producto por ID
   * @param id  ID del producto a editar
   * @param productData  Datos del producto a editar
   * @returns  Mensaje de éxito o error
   */
  editProduct(id: number, productData: FormData): Observable<string> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}'); // Obtener el token del localStorage
    const token = auth?.token; // Obtener el token del objeto auth

    if (!token) {
      throw new Error('Token no encontrado en el localStorage'); // Lanzar un error si no hay token
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crear un objeto de cabeceras con el token

    const url = `${this.baseUrl}/product/${id}`; // Crear la URL para llamar a la API

    console.log(`Llamando a la API para editar producto con ID ${id}`);

    return this.http.put(url, productData, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al editar el producto.'; // Maneja el error
        if (error.error instanceof ErrorEvent) { // Si el error es de tipo ErrorEvent
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
        }
        console.error('Error al editar el producto:', error); // Imprimir en consola para debug
        return throwError(errorMessage); // Retornar el error
      })
    );
  }

  /**
   *  Agrega un producto
   * @param productData  Datos del producto a agregar
   * @returns  Mensaje de éxito o error
   */
  addProduct(productData: FormData): Observable<string> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}'); // Obtener el token del localStorage
    const token = auth?.token;  // Obtener el token del objeto auth

    if (!token) {
      throw new Error('Token no encontrado en el localStorage'); // Lanzar un error si no hay token
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crear un objeto de cabeceras con el token

    const url = `${this.baseUrl}/product/`; // Crear la URL para llamar a la API

    console.log('Llamando a la API para agregar producto...'); // Imprimir en consola para debug

    return this.http.post(url, productData, { headers, responseType: 'text' }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al agregar el producto.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;  // Manejar el error
        } else {
          errorMessage = error.error;
        }
        console.error('Error al agregar el producto:', error); // Imprimir en consola para debug
        return throwError(errorMessage); // Retornar el error
      })
    );
  }
  /**
   *  Obtiene los tipos de productos
   * @returns  Lista de tipos de productos
   */
  getProductTypes(): Observable<ProductType[]> {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/product/types`;
    console.log('Llamando a la API para obtener tipos de productos...'); // Imprimir en consola para debug

    return this.http.get<ProductType[]>(url, { headers }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Error desconocido al obtener los tipos de productos.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error; // Manejar el error
        }
        console.error('Error al obtener tipos de productos:', error); // Imprimir en consola para debug
        return throwError(errorMessage); // Retornar el error
      })
    );
  }

}
