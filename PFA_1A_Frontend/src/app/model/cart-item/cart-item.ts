import { Cart } from '../cart/cart';
import { ProductVariation } from '../product-variation/product-variation';
import { Product } from '../product/product';

export class CartItem {
  public id!: number;
  public reference!: string;
  public quantity!: number;
  public product!: Product;
  public cart!: Cart;
  public productVariations!: Array<ProductVariation>;
}
