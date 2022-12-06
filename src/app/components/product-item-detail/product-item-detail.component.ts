import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent implements OnInit {
  id = 0;
  product: Product | undefined = undefined;
  quantities: number[] = [...Array(20).keys()].map((_, i) => i + 1);
  @Output() addedToCart = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      this.productService.getProductById(this.id).subscribe((data) => {
        if (data !== undefined) {
          this.product = data;
          this.product.quantity = 1;
        } else {
          this.router.navigateByUrl('page-not-found');
        }
      });
    });
  }

  onAddtoCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.quantity} x ${product.name} is added to cart`);
    if (this.product !== undefined) {
      this.product.quantity = 1;
    }
  }
}
