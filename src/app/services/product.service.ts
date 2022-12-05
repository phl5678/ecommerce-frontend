import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { catchError, map, Observable, of } from 'rxjs';
import * as data from '../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return of((data as any).default);
  }
  getProductById(id: number): Observable<Product|undefined> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find((prod) => prod.id === id)!),
      catchError(this.handleError<Product>(`getProductById id=${id}`))
    );
  }
}
