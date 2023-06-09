import { Product } from '../product/product';

export class ProductVariation {
  public id!: number;
  public type!: string;
  public value!: string;
  public enabled!: boolean;
  public product!: Product;
}
