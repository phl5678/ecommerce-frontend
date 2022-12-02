import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cart: Product[] = [];
  quantities: number[] = [...Array(21).keys()].map((_, i) => i);
  order: Order = new Order();
  @Output() cartItemRemoved = new EventEmitter();
  @Output() orderPlaced = new EventEmitter();

  fullname = '';
  address = '';
  ccnumber = '';

  constructor(private orderService: OrderService) {}

  totalPrice(): number {
    return this.cart.reduce(
      (accumulator: number, currentValue: Product) =>
        accumulator +
        currentValue.price *
          (currentValue.quantity === undefined ? 0 : currentValue.quantity),
      0
    );
  }

  ngOnInit(): void {
    // this.orderService.getCart().subscribe(data => {
    //   this.cart = data;
    // })
  }

  onQuantityChange(item: Product): void {
    item.quantity = item.quantity === undefined ? 0 : +item.quantity;
    if (item.quantity === 0) {
      this.cartItemRemoved.emit(item);
    }
    //TODO: update cart service
  }

  onPlaceOrder(): void {
    (this.order.totalPrice = this.totalPrice()),
      (this.order.products = this.cart);
    this.orderPlaced.emit(this.order);
  }
}
