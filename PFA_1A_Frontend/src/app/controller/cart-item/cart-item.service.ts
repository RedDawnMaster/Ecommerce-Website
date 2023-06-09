import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item/cart-item';
import { environment } from 'src/environment/environment';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private API = '';
  constructor(private http: HttpClient, private userService: UserService) {
    this.API = environment.apiUrl + '/cartItem/';
  }

  private _selectedCartItem!: CartItem;
  private _cartItems!: Array<CartItem>;

  public deleteByReferenceAndCartUserUsername(
    reference: string
  ): Observable<number> {
    return this.http.delete<number>(
      this.API + reference + '/' + this.user.username
    );
  }

  public deleteByCartUserUsername(): Observable<number> {
    return this.http.delete<number>(this.API + this.user.username);
  }

  public save(id: number): Observable<CartItem> {
    return this.http.post<CartItem>(this.API + id, this.selectedCartItem);
  }

  public get selectedCartItem(): CartItem {
    return this._selectedCartItem;
  }
  public set selectedCartItem(value: CartItem) {
    this._selectedCartItem = value;
  }

  public get cartItems(): Array<CartItem> {
    return this._cartItems;
  }
  public set cartItems(value: Array<CartItem>) {
    this._cartItems = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
