import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { Order } from './models/order.model';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Store';
  order: Order = new Order();
  isAuthenticated: boolean = false;
  isAuth0Loading$ = this.authService.isLoading$;
  
  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  signIn(redirectUrl?: string): void {
    if(redirectUrl !== undefined){
      this.authService.loginWithRedirect({
        appState: {
          target: redirectUrl,
        },
      });
    }
    else {
    this.authService.loginWithRedirect();
    }
  }
  signUp(redirectUrl?: string): void {
    if(redirectUrl !== undefined){
      this.authService.loginWithRedirect({
        screen_hint: 'signup',
        appState: {
          target: redirectUrl,
        },
      });
    }
    else {
    this.authService.loginWithRedirect({ screen_hint: 'signup' });
    }
  }
  signOut(): void {
    this.authService.logout({
      returnTo: this.document.location.origin,
    });
  }
  onActivate(comp: Component): void {
    if (comp instanceof CartComponent){
      comp.isAuthenticated = this.isAuthenticated;
      if (this.isAuthenticated === true){
        this.authService.user$.subscribe((success: any) => {
          comp.user = success;
        });
      }
      comp.onSignIn.subscribe(()=>{
        this.signIn('/cart');
      });
      comp.onSignUp.subscribe(()=>{
        this.signUp('/cart');
      });
    }
  }
}
