import { OrderItemService } from './../../controller/order-item/order-item.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/controller/order/order.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Order } from 'src/app/model/order/order';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  public refundable!: boolean;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private location: Location,
    private orderItemService: OrderItemService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.orderService.checkRefundable(this.selectedOrder.id).subscribe({
      next: (data) => (this.refundable = data),
      error: (error) => console.log(error),
    });
  }

  refund(reference: string) {
    this.orderItemService.refund(reference).subscribe({
      next: () => {
        let index = this.selectedOrder.orderItems.findIndex(
          (o) => o.reference === reference
        );
        this.selectedOrder.orderItems.splice(index, 1);
      },
      error: (error) => console.log(error),
    });
  }

  goBack() {
    this.location.back();
  }

  public get selectedOrder(): Order {
    return this.orderService.selectedOrder;
  }
  public set selectedOrder(value: Order) {
    this.orderService.selectedOrder = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
