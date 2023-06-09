import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/controller/order/order.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Order } from 'src/app/model/order/order';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public searchUsername!: string;
  public searchEmail!: string;
  constructor(
    private userService: UserService,
    private _datePipe: DatePipe,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userService.findByRole('CLIENT').subscribe({
      next: (users) => (this.users = users),
    });
    this.searchUsername = '';
    this.searchEmail = '';
  }

  viewOrders(username: string) {
    this.orderService
      .findByUserUsername(username)
      .subscribe({ next: (orders) => (this.orders = orders) });
    this.router.navigate(['orders-view']);
  }

  deleteUser(username: string) {
    this.userService.deleteByUsername(username).subscribe({
      next: () => {
        let index = this.users.findIndex((u) => u.username === username);
        this.users.splice(index, 1);
      },
      error: (error) => console.log(error),
    });
  }

  searchByUsername() {
    let username = this.searchUsername;
    if (this.searchUsername === '') username = 'empty';
    this.searchEmail = '';
    this.userService.findByUsernameContains(username).subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.log(error),
    });
  }

  searchByEmail() {
    let email = this.searchEmail;
    if (this.searchEmail === '') email = 'empty';
    this.searchUsername = '';
    this.userService.findByEmailContains(email).subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.log(error),
    });
  }

  public get selectedUser(): User {
    return this.userService.selectedUser;
  }
  public set selectedUser(value: User) {
    this.userService.selectedUser = value;
  }
  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
  public get users(): Array<User> {
    return this.userService.users;
  }
  public set users(value: Array<User>) {
    this.userService.users = value;
  }

  public get datePipe(): DatePipe {
    return this._datePipe;
  }
  public set datePipe(value: DatePipe) {
    this._datePipe = value;
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
}
