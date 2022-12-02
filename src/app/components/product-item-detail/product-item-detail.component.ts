import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent implements OnInit {
  id = 0;
  product: Product = new Product();
  quantities: number[] = [...Array(20).keys()].map((_, i) => i + 1);
  @Output() addedToCart = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      this.orderService.getProductById(this.id).subscribe((data) => {
        this.product = data;
        this.product.quantity = 1;
      });
    });
  }

  onAddtoCart(product: Product): void {
    this.addedToCart.emit(product);
  }
}
