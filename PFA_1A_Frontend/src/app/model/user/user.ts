import { Cart } from '../cart/cart';
import { Order } from '../order/order';
import { Product } from '../product/product';
import { Review } from '../review/review';

export class User {
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: string;
  public email!: string;
  public password!: string;
  public birthDate!: Date;
  public creationDate!: Date;
  public totalBought!: number;
  public orders!: Array<Order>;
  public wishList!: Array<Product>;
  public cart!: Cart;
  public reviews!: Array<Review>;
}
