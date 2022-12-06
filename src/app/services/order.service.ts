import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static nextOrderId: number = 100;
  order: Order = new Order();
  constructor() { }

  submitOrder(order:Order, user: User, products: Product[], totalPrice: number): Observable<Order> {
    OrderService.nextOrderId++;
    order.id = OrderService.nextOrderId;
    order.user = user;
    order.products = products;
    order.totalPrice = totalPrice;

    this.order = order;
    return of(order);
  }
  getCurrentOrder(): Observable<Order> {
    return of(this.order);
  }

  clearCurrentOrder(): Observable<void> {
    this.order = new Order();
    return of();
  }

}
