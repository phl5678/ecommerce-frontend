import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];

  constructor() {}

  /**
   * Load cart from local storage. 
   */
  loadCart(): void {
    const cartString: string = localStorage.getItem('cart_items')!;
    this.cart = JSON.parse(cartString) ?? [];
  }
  /**
   * Save cart to local storage
   */
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }
  /**
   * Clear cart in local storage
   */
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart_items');
  }

  /**
   * Get a list of cart items.
   * @returns cart items. 
   */
  getCart(): Product[] {
    return this.cart;
  }

  /**
   * Add product to the cart if the product doesn't exist in the cart, otherwise update the quantity. 
   * Updated cart is saved to local storage.
   * @param product The product to be added to cart.
   */
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

  /**
   * Update the quantity of the product if quantity is not 0, otherwise remove the product from the cart. 
   * Cart in local storage is updated.
   * @param product The product to be updated
   */
  updateCart(product: Product): void {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (product.quantity === 0) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity = product.quantity;
    }
    if (this.cart.length > 0) {
      this.saveCart();
    } else {
      this.clearCart();
    }
  }

  /**
   * Get the total quantity of the items in the cart.
   * @returns The total quantity of the items in the cart.
   */
  getCartQuantity(): number {
    this.loadCart();
    return this.cart.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.quantity === undefined ? 0 : currentValue.quantity),
      0
    );
  }
  /**
   * Get the total price of the items in the cart.
   * @returns The total price of the items in the cart.
   */
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
