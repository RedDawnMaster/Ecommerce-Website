import { Product } from '../product/product';

export class Categorie {
  public id!: number;
  public label!: string;
  public total!: number;
  public products!: Array<Product>;
}
