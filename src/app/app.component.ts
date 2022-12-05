import { Component, OnInit } from '@angular/core';
import { Order } from './models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Store';
  order: Order = new Order();

  constructor() {}

  ngOnInit(): void {}
}
