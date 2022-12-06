import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() isAuthenticated: boolean = false;
  @Output() onSignOut = new EventEmitter();
  @Output() onSignIn = new EventEmitter();
  @Output() onSignUp = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  cartQuantity(): number {
    return this.cartService.getCartQuantity();
  }

  signIn(): void {
    this.onSignIn.emit();
  }
  signUp(): void {
    this.onSignUp.emit();
  }
  signOut(): void {
    this.onSignOut.emit();
  }

}
