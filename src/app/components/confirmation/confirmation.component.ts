import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  @Input() order: Order = new Order();
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order = this.orderService.getCurrentOrder();
  }
  ngOnDestroy(): void{
    this.order = new Order();
    this.orderService.clearCurrentOrder();
  }
}
