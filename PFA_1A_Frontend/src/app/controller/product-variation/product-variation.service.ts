import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductVariation } from 'src/app/model/product-variation/product-variation';
import { environment } from 'src/environment/environment';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductVariationService {
  private API = '';
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.API = environment.apiUrl + '/productVariation/';
  }

  private _selectedProductVariation!: ProductVariation;
  private _productVariations!: Array<ProductVariation>;

  public findByProductLabel(): Observable<Array<ProductVariation>> {
    return this.http.get<Array<ProductVariation>>(
      this.API + this.selectedProduct.label
    );
  }

  public deleteByProductLabelAndTypeAndValue(
    label: string,
    type: string,
    value: string
  ): Observable<number> {
    return this.http.delete<number>(
      this.API + label + '/' + type + '/' + value
    );
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.API, this.selectedProductVariation);
  }

  public get selectedProductVariation(): ProductVariation {
    return this._selectedProductVariation;
  }
  public set selectedProductVariation(value: ProductVariation) {
    this._selectedProductVariation = value;
  }
  public get productVariations(): Array<ProductVariation> {
    return this._productVariations;
  }
  public set productVariations(value: Array<ProductVariation>) {
    this._productVariations = value;
  }

  public get selectedProduct(): Product {
    return this.productService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.productService.selectedProduct = value;
  }
}
