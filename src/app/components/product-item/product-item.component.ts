import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() addedToCart = new EventEmitter();
  quantities: number[] = [...Array(20).keys()].map((_, i) => i + 1);

  constructor() {}

  ngOnInit(): void {
    this.product.quantity = 1;
  }

  onAddtoCart(product: Product): void {
    this.addedToCart.emit(product);
  }
}
