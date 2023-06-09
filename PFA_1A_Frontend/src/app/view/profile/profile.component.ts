import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controller/user/user.service';
import { User } from 'src/app/model/user/user';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/controller/order/order.service';
import { Order } from 'src/app/model/order/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public validateUsername!: boolean;
  public validateEmail!: boolean;
  public validateFirstName!: boolean;
  public validateLastName!: boolean;
  public validateExistence!: boolean;
  constructor(
    private userService: UserService,
    private _datePipe: DatePipe,
    private router: Router,
    private orderServie: OrderService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.orderServie
      .findByUserUsername(this.user.username)
      .subscribe({ next: (orders) => (this.orders = orders) });
    this.validateUsername = true;
    this.validateEmail = true;
    this.validateFirstName = true;
    this.validateLastName = true;
    this.validateExistence = true;
  }

  update() {
    if (this.validateForm()) {
      this.userService.update().subscribe({
        next: (data) => {
          if (data !== -1) {
            this.userService
              .login(this.user.email, this.user.password)
              .subscribe({
                next: (user) => (this.user = user),
                error: (error) => console.log(error),
              });
            this.router.navigate(['/']);
          } else this.validateExistence = false;
        },
      });
    }
  }

  delete() {
    this.userService
      .deleteByUsername(this.userService.getUser().username)
      .subscribe({
        next: () => {
          this.userService.clearUser();
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    this.router.navigate(['../order-view']);
  }

  validateForm(): boolean {
    let counter = 0;
    if (this.user.username === undefined || this.user.username === '') {
      this.validateUsername = false;
      counter++;
    } else this.validateUsername = true;
    if (this.user.email === undefined || this.user.email === '') {
      this.validateEmail = false;
      counter++;
    } else this.validateEmail = true;
    if (this.user.firstName === undefined || this.user.firstName === '') {
      this.validateFirstName = false;
      counter++;
    } else this.validateFirstName = true;
    if (this.user.lastName === undefined || this.user.lastName === '') {
      this.validateLastName = false;
      counter++;
    } else this.validateLastName = true;
    if (counter === 0) return true;
    else return false;
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

  public get selectedOrder(): Order {
    return this.orderServie.selectedOrder;
  }
  public set selectedOrder(value: Order) {
    this.orderServie.selectedOrder = value;
  }
  public get orders(): Array<Order> {
    return this.orderServie.orders;
  }
  public set orders(value: Array<Order>) {
    this.orderServie.orders = value;
  }
  public get datePipe(): DatePipe {
    return this._datePipe;
  }
  public set datePipe(value: DatePipe) {
    this._datePipe = value;
  }
}
