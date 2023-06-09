import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/model/order/order';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API = '';
  constructor(private http: HttpClient) {
    this.API = environment.apiUrl + '/order/';
  }

  private _selectedOrder!: Order;
  private _orders!: Array<Order>;

  public findByUserUsername(username: string): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.API + username);
  }

  public checkRefundable(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.API + 'id/' + id);
  }

  public get selectedOrder(): Order {
    return this._selectedOrder;
  }
  public set selectedOrder(value: Order) {
    this._selectedOrder = value;
  }
  public get orders(): Array<Order> {
    return this._orders;
  }
  public set orders(value: Array<Order>) {
    this._orders = value;
  }
}
