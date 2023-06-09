import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/controller/cart/cart.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Cart } from 'src/app/model/cart/cart';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public validateEmail!: boolean;
  public validatePassword!: boolean;
  public validateCredentials!: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.user = new User();
    this.validateEmail = true;
    this.validatePassword = true;
    this.validateCredentials = true;
  }

  login() {
    if (this.validateForm()) {
      this.userService.login(this.user.email, this.user.password).subscribe({
        next: (user) => {
          if (user === null) {
            this.validateCredentials = false;
          } else {
            this.user = user;
            this.cartService.findByUserUsername().subscribe({
              next: (cart) => (this.cart = cart),
              error: (error) => console.log(error),
            });
            this.router.navigate(['../']);
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  validateForm(): boolean {
    let counter = 0;
    if (this.user.email === undefined || this.user.email === '') {
      this.validateEmail = false;
      counter++;
    } else this.validateEmail = true;
    if (this.user.password === undefined || this.user.password === '') {
      this.validatePassword = false;
      counter++;
    } else this.validatePassword = true;
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
  public get cart(): Cart {
    return this.cartService.cart;
  }
  public set cart(value: Cart) {
    this.cartService.cart = value;
  }
}
