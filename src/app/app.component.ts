import { Component, OnInit } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Product } from './models/product.model';
import { Router } from '@angular/router';
import { Order } from './models/order.model';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MyStore';
  cart: Product[] = [];
  products: Product[] = [];
  order: Order = new Order();

  constructor(private router: Router) {}

  ngOnInit(): void {
    //TODO get cart service
  }

  onOutletLoaded(comp: Component): void {
    if (
      !(
        comp instanceof ProductListComponent ||
        comp instanceof ProductItemDetailComponent ||
        comp instanceof CartComponent ||
        comp instanceof ConfirmationComponent
      )
    ) {
      return;
    }
    if (
      comp instanceof ProductListComponent ||
      comp instanceof ProductItemDetailComponent
    ) {
      const prodComp: ProductListComponent | ProductItemDetailComponent = comp;

      prodComp.addedToCart.subscribe((product: Product) => {
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
        alert(`${product.quantity} x ${product.name} is added to cart`);
        product.quantity = 1;
        //TODO: update cart service
      });
    } else if (comp instanceof CartComponent) {
      const cartComp: CartComponent = comp;
      cartComp.cart = this.cart;

      cartComp.cartItemRemoved.subscribe((item) => {
        const index = this.cart.findIndex((p) => p.id === item.id);
        this.cart.splice(index, 1);
        cartComp.cart = this.cart;
        alert(`${item.name} is removed from cart`);
      });

      cartComp.orderPlaced.subscribe((order) => {
        //TODO: update service
        this.order = order;
        this.order.id = 1;
        this.router.navigateByUrl('/confirmation');
        this.cart = [];
        //this.order = new Order(); //TODO only alive in confirmation page.
      });
    } else if (comp instanceof ConfirmationComponent) {
      const confComp: ConfirmationComponent = comp;
      confComp.order = this.order;
    }
  }
  onOutletUnloaded(): void {
  }
}
