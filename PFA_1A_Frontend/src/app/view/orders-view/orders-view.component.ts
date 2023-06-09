import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/controller/order/order.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Order } from 'src/app/model/order/order';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css'],
})
export class OrdersViewComponent implements OnInit {
  constructor(
    private _datePipe: DatePipe,
    private orderService: OrderService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    this.router.navigate(['order-view']);
  }
  public get selectedOrder(): Order {
    return this.orderService.selectedOrder;
  }
  public set selectedOrder(value: Order) {
    this.orderService.selectedOrder = value;
  }
  public get orders(): Array<Order> {
    return this.orderService.orders;
  }
  public set orders(value: Array<Order>) {
    this.orderService.orders = value;
  }

  public get datePipe(): DatePipe {
    return this._datePipe;
  }
  public set datePipe(value: DatePipe) {
    this._datePipe = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
