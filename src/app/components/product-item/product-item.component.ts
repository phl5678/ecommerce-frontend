import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();
  quantities: number[] = [...Array(20).keys()].map((_, i) => i + 1);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.product.quantity = 1;
  }

  onAddtoCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.quantity} x ${product.name} is added to cart`);
    this.product.quantity = 1;
  }

}
