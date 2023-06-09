import { OrderItem } from '../order-item/order-item';
import { User } from '../user/user';

export class Order {
  public id!: number;
  public reference!: string;
  public total!: number;
  public deletedProductsTotal!: number;
  public orderDate!: Date;
  public deliveryDate!: Date;
  public delivered!: boolean;
  public static refundPeriod: number;
  public static deliveryTime: number;
  public user!: User;
  public orderItems!: Array<OrderItem>;
}
