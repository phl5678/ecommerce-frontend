import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  static nextOrderId = 100;
  order: Order = new Order();
  constructor() {}

  /**
   * Create a new (completed) order for a user in database. Order confirmed.
   * @param order The order info including payment fullname, address, and ccnumber.
   * @param user The user info including email
   * @param products The cart items
   * @param totalPrice The total prices of the cart items
   * @returns The order info including a new order ID.
   */
  submitOrder(
    order: Order,
    user: User,
    products: Product[],
    totalPrice: number
  ): Observable<Order> {
    OrderService.nextOrderId++;
    order.id = OrderService.nextOrderId;
    order.user = user;
    order.products = products;
    order.totalPrice = totalPrice;

    this.order = order;
    //TODO: save to database via API endpoint
    return of(order);
  }
  /**
   * Get the current active order from database. Open order to be loaded in the cart.
   * @returns The current active order info
   */
  getCurrentOrder(): Observable<Order> {
    //TODO: get from database via API endpoint
    return of(this.order);
  }

  /**
   * Clear the current active order info from database.
   * @returns 
   */
  clearCurrentOrder(): Observable<void> {
    this.order = new Order();
    //TODO: clear database via API endpoint
    return of();
  }
}
