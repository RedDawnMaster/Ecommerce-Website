import { Categorie } from '../categorie/categorie';
import { ProductVariation } from '../product-variation/product-variation';
import { Review } from '../review/review';

export class Product {
  public id!: number;
  public label!: string;
  public description!: string;
  public image!: string;
  public price!: number;
  public stars!: number;
  public evaluationCount!: number;
  public stock!: number;
  public numberOfOrders!: number;
  public reviews!: Array<Review>;
  public categorie!: Categorie;
  public productVariations!: Array<ProductVariation>;
}
