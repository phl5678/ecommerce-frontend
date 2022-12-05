import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  cartQuantity(): number {
    return this.cartService.getCartQuantity();
  }

}
