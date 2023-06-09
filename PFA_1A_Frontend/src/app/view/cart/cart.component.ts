import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemService } from 'src/app/controller/cart-item/cart-item.service';
import { CartService } from 'src/app/controller/cart/cart.service';
import { UserService } from 'src/app/controller/user/user.service';
import { CartItem } from 'src/app/model/cart-item/cart-item';
import { Cart } from 'src/app/model/cart/cart';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cardHolder!: string;
  public cardNumber!: number;
  public expiration!: Date;
  public cvv!: number;
  public errors!: string;
  public validateCardHolder!: boolean;
  public validateCardNumber!: boolean;
  public validateExpiration!: boolean;
  public validateCvv!: boolean;
  public validateStock!: boolean;
  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.errors = '';
    this.validateCardHolder = true;
    this.validateCardNumber = true;
    this.validateExpiration = true;
    this.validateCvv = true;
    this.validateStock = true;
  }

  public deleteCartItem(reference: string) {
    this.cartItemService
      .deleteByReferenceAndCartUserUsername(reference)
      .subscribe({
        next: () =>
          (this.cart.cartItems = this.cart.cartItems.filter(
            (c) => c.reference !== reference
          )),
      });
  }

  public deleteCartItems() {
    this.cartItemService.deleteByCartUserUsername().subscribe({
      next: () => {
        this.cart.cartItems = [];
      },
      error: (error) => console.log(error),
    });
  }

  public checkout() {
    if (this.validateForm()) {
      this.cartService.checkout().subscribe({
        next: (data) => {
          if (data !== 'completed') {
            this.errors = data;
            this.validateStock = false;
          } else {
            this.cart.total = 0;
            this.cart.cartItems = [];
            this.router.navigate(['products-list']);
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  validateForm(): boolean {
    let count = 0;
    if (this.cardHolder === undefined || this.cardHolder === '') {
      this.validateCardHolder = false;
      count++;
    } else this.validateCardHolder = true;
    if (
      this.cardNumber === undefined ||
      this.cardNumber.toString() === '' ||
      this.cardNumber.toString().length !== 16 ||
      this.cardNumber <= 0
    ) {
      this.validateCardNumber = false;
      count++;
    } else this.validateCardNumber = true;

    if (this.expiration === undefined) {
      this.validateExpiration = false;
      count++;
    } else this.validateExpiration = true;
    if (
      this.cvv === undefined ||
      this.cvv.toString() === '' ||
      this.cvv.toString().length !== 3 ||
      this.cvv <= 0
    ) {
      this.validateCvv = false;
      count++;
    } else this.validateCvv = true;
    if (count === 0) return true;
    else return false;
  }

  public get cart(): Cart {
    return this.cartService.cart;
  }
  public set cart(value: Cart) {
    this.cartService.cart = value;
  }

  public get selectedCartItem(): CartItem {
    return this.cartItemService.selectedCartItem;
  }
  public set selectedCartItem(value: CartItem) {
    this.cartItemService.selectedCartItem = value;
  }

  public get cartItems(): Array<CartItem> {
    return this.cartItemService.cartItems;
  }
  public set cartItems(value: Array<CartItem>) {
    this.cartItemService.cartItems = value;
  }
  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
