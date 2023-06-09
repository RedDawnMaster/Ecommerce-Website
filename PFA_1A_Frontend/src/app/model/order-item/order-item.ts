import { Order } from '../order/order';
import { ProductVariation } from '../product-variation/product-variation';
import { Product } from '../product/product';

export class OrderItem {
  public id!: number;
  public reference!: string;
  public quantity!: number;
  public product!: Product;
  public order!: Order;
  public productVariations!: Array<ProductVariation>;
}
