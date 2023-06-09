import { Product } from '../product/product';
import { User } from '../user/user';

export class Review {
  public id!: number;
  public description!: string;
  public stars!: number;
  public user!: User;
  public product!: Product;
}
