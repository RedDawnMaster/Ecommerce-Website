import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API = '';
  constructor(private http: HttpClient) {
    this.API = environment.apiUrl + '/product/';
  }

  private _selectedProduct!: Product;
  private _products!: Array<Product>;

  public findByLabelContains(label: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.API + label);
  }

  public findByCategorieLabel(label: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.API + 'categorie/' + label);
  }

  public findByPriceBetween(
    lowerBoundPrice: number,
    higherBoundPrice: number
  ): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      this.API + lowerBoundPrice + '/' + higherBoundPrice
    );
  }

  public findAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.API);
  }

  public countByPriceBetween(
    lowerBoundPrice: number,
    higherBoundPrice: number
  ): Observable<number> {
    return this.http.get<number>(
      this.API +
        'countProductsByPrice' +
        '/' +
        lowerBoundPrice +
        '/' +
        higherBoundPrice
    );
  }

  public countByCategorieLabel(label: string): Observable<number> {
    return this.http.get<number>(
      this.API + 'countByCategorieLabel' + '/' + label
    );
  }

  public deleteByLabel(label: string): Observable<number> {
    return this.http.delete<number>(this.API + label);
  }

  public save(): Observable<Product> {
    return this.http.post<Product>(this.API, this.selectedProduct);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.API, this.selectedProduct);
  }

  public get selectedProduct(): Product {
    return this._selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this._selectedProduct = value;
  }
  public get products(): Array<Product> {
    return this._products;
  }
  public set products(value: Array<Product>) {
    this._products = value;
  }
}
