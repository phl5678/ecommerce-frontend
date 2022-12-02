import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Output() addedToCart = new EventEmitter();
  products: Product[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddtoCart(product: Product): void {
    this.addedToCart.emit(product);
  }
}
