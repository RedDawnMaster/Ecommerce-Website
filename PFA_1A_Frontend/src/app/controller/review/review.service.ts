import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Review } from 'src/app/model/review/review';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/model/product/product';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private API = '';
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.API = environment.apiUrl + '/review/';
  }

  private _selectedReview!: Review;
  private _reviews!: Array<Review>;

  public findByProductLabelAndUserUsernameContains(
    username: string
  ): Observable<Array<Review>> {
    return this.http.get<Array<Review>>(
      this.API + this.selectedProduct.label + '/' + username
    );
  }

  public findByProductLabel(): Observable<Array<Review>> {
    return this.http.get<Array<Review>>(this.API + this.selectedProduct.label);
  }

  public deleteByUserUsernameAndProductLabel(
    username: string,
    label: string
  ): Observable<number> {
    return this.http.delete<number>(this.API + username + '/' + label);
  }

  public save(): Observable<Review> {
    return this.http.post<Review>(this.API, this.selectedReview);
  }

  public update(): Observable<void> {
    return this.http.put<void>(this.API, this.selectedReview);
  }

  public get selectedReview(): Review {
    return this._selectedReview;
  }
  public set selectedReview(value: Review) {
    this._selectedReview = value;
  }
  public get reviews(): Array<Review> {
    return this._reviews;
  }
  public set reviews(value: Array<Review>) {
    this._reviews = value;
  }

  public get selectedProduct(): Product {
    return this.productService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.productService.selectedProduct = value;
  }
}
