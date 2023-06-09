import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/cart/cart';
import { environment } from 'src/environment/environment';
import { UserService } from '../user/user.service';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API = '';
  constructor(private http: HttpClient, private userService: UserService) {
    this.API = environment.apiUrl + '/cart/';
  }

  private _cart!: Cart;

  public findByUserUsername(): Observable<Cart> {
    return this.http.get<Cart>(this.API + this.user.username);
  }

  public getCartTotal(): Observable<number> {
    return this.http.get<number>(this.API + 'getCartTotal/' + this.cart.id);
  }

  public checkout() {
    return this.http.post(
      this.API + this.user.username,
      {},
      { responseType: 'text' }
    );
  }

  public get cart(): Cart {
    return this._cart;
  }
  public set cart(value: Cart) {
    this._cart = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
