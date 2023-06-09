import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from 'src/app/model/order-item/order-item';
import { environment } from 'src/environment/environment';
import { OrderService } from '../order/order.service';
import { Order } from 'src/app/model/order/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private API = '';
  constructor(private http: HttpClient, private orderService: OrderService) {
    this.API = environment.apiUrl + '/orderItem/';
  }

  private _orderItems!: Array<OrderItem>;

  public refund(reference: string): Observable<void> {
    return this.http.delete<void>(
      this.API + reference + '/' + this.selectedOrder.reference
    );
  }

  public get orderItems(): Array<OrderItem> {
    return this._orderItems;
  }
  public set orderItems(value: Array<OrderItem>) {
    this._orderItems = value;
  }

  public get selectedOrder(): Order {
    return this.orderService.selectedOrder;
  }
  public set selectedOrder(value: Order) {
    this.orderService.selectedOrder = value;
  }
}
