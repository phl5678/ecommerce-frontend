import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() { }

  loadCart(): void {
    const cartString:string = localStorage.getItem('cart_items')!;
    this.cart = JSON.parse(cartString) ?? [];
  }
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }
  
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart_items');
  }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const existing = this.cart.findIndex((v) => v.id === product.id);
    if (existing >= 0) {
      const item: Product = this.cart[existing];
      if (item.quantity !== undefined && product.quantity !== undefined) {
        item.quantity += product.quantity;
      } else {
        throw new Error(
          `Quantity is not defined in ${this.cart[existing].name} item.`
        );
      }
    } else {
      this.cart.push({ ...product });
    }

    this.saveCart();
  }

  updateCart(product: Product): void {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (product.quantity === 0) {    
        this.cart.splice(index, 1);
    }
    else {
        this.cart[index].quantity = product.quantity;
    }
    if(this.cart.length > 0){
      this.saveCart();
    }
    else {
      this.clearCart();
    }
  }

  getCartQuantity(): number {
    this.loadCart();
    return this.cart.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.quantity === undefined ? 0 : currentValue.quantity),
      0
    );
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (accumulator: number, currentValue: Product) =>
        accumulator +
        currentValue.price *
          (currentValue.quantity === undefined ? 0 : currentValue.quantity),
      0
    );
  }

}
