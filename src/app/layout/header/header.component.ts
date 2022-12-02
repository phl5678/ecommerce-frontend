import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() cart: Product[] = [];

  cartQuantity(): number {
    return this.cart.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.quantity === undefined ? 0 : currentValue.quantity),
      0
    );
  }
  constructor() {}

  ngOnInit(): void {}
}
