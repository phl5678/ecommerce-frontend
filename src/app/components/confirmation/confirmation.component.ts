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
    this.orderService.getCurrentOrder().subscribe((data) => {
      this.order = data;
    });
  }

  ngOnDestroy(): void {
    this.order = new Order();
    this.orderService.clearCurrentOrder().subscribe();
  }
}
