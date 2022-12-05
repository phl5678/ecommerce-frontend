import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static nextOrderId: number = 100;
  order: Order = new Order();
  constructor() { }

  submitOrder(order:Order): void {
    OrderService.nextOrderId++
    order.id = OrderService.nextOrderId;
    this.order = order;
  }

  getCurrentOrder(): Order {
    return this.order;
  }

  clearCurrentOrder(): void {
    this.order = new Order();
  }

}
