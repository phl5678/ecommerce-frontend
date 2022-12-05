import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  quantities: number[] = [...Array(21).keys()].map((_, i) => i);
  order: Order = new Order();

  fullname = '';
  address = '';
  ccnumber = '';

  constructor(private cartService: CartService,private orderService:OrderService, private router: Router) {}

  totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
    })
  }

  onQuantityChange(product: Product): void {
    product.quantity = product.quantity === undefined ? 0 : +product.quantity;
    this.cartService.updateCart(product);
    if (product.quantity === 0) {
      alert(`${product.name} is removed from cart`);
    }
  }

  onPlaceOrder(): void {
    this.order.totalPrice = this.totalPrice();
    this.order.products = this.cart;
    this.orderService.submitOrder(this.order);
    this.cartService.clearCart();
    this.router.navigateByUrl('/confirmation');
  }
}
