import { CartItem } from '../cart-item/cart-item';
import { User } from '../user/user';

export class Cart {
  public id!: number;
  public total!: number;
  public user!: User;
  public cartItems!: Array<CartItem>;
}
