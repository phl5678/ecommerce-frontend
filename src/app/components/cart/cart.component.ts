import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
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
  isAuthenticated = false;
  user: User = new User();
  cart: Product[] = [];
  quantities: number[] = [...Array(21).keys()].map((_, i) => i);
  order: Order = new Order();
  @Output() onSignIn = new EventEmitter();
  @Output() onSignUp = new EventEmitter();

  fullname = '';
  address = '';
  ccnumber = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cart = this.cartService.getCart();
  }

  onQuantityChange(product: Product): void {
    product.quantity = product.quantity === undefined ? 0 : +product.quantity;
    this.cartService.updateCart(product);
    this.cart = [...this.cartService.getCart()];
    if (product.quantity === 0) {
      alert(`${product.name} is removed from cart`);
    }
  }

  signIn(): void {
    this.onSignIn.emit();
  }
  signUp(): void {
    this.onSignUp.emit();
  }
  onPlaceOrder(): void {
    this.orderService
      .submitOrder(this.order, this.user, this.cart, this.totalPrice())
      .subscribe();
    this.cartService.clearCart();
    this.cart = [...this.cartService.getCart()];
    this.router.navigateByUrl('/confirmation');
  }
}
