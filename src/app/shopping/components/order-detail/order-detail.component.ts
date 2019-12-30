import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  orders$;
  constructor(private authService: AuthService,
    private orderService: OrderService) {
      this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
    console.log(this.orders$);
  }
}