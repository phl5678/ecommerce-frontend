import { User } from '@auth0/auth0-angular';
import { Product } from './product.model';

export class Order {
  id?: number;
  fullname: string;
  address: string;
  ccnumber: string;
  products: Product[];
  totalPrice: number;
  user: User;

  constructor() {
    this.id = 0;
    this.fullname = '';
    this.address = '';
    this.ccnumber = '';
    this.products = [];
    this.totalPrice = 0;
    this.user = new User();
  }
}
