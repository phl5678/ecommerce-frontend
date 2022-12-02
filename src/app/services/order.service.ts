import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import * as data from '../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return of((data as any).default);
    //return this.http.get<[]>("http://localhost:4200/assets/data.json");
  }
  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.find((prod) => prod.id === id)!)
    );
  }

  getCart(): Observable<Product[]> {
    return of([]);
  }
  addToCart(item: Product): Observable<Product[]> {
    return of([]);
  }
  updateCart(id: number): Observable<Product[]> {
    return of([]);
  }
  clearCart(): void {}
}
