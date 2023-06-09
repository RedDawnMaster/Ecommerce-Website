import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemService } from 'src/app/controller/cart-item/cart-item.service';
import { CartService } from 'src/app/controller/cart/cart.service';
import { ProductService } from 'src/app/controller/product/product.service';
import { ReviewService } from 'src/app/controller/review/review.service';
import { UserService } from 'src/app/controller/user/user.service';
import { CartItem } from 'src/app/model/cart-item/cart-item';
import { Cart } from 'src/app/model/cart/cart';
import { ProductVariation } from 'src/app/model/product-variation/product-variation';
import { Product } from 'src/app/model/product/product';
import { Review } from 'src/app/model/review/review';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  public selectedVariations!: Array<ProductVariation>;
  public validateQuantity!: boolean;
  public validateReview!: boolean;
  public writeReview!: boolean;
  public selectedValue!: number;
  public searchUsername: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(
    private prodcutService: ProductService,
    private cartItemService: CartItemService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.reviewService
      .findByProductLabel()
      .subscribe({ next: (reviews) => (this.reviews = reviews) });
    this.selectedCartItem = new CartItem();
    this.selectedCartItem.product = this.selectedProduct;
    this.selectedCartItem.quantity = 1;
    this.selectedVariations = new Array<ProductVariation>();
    this.validateQuantity = true;
    this.validateReview = true;
    this.writeReview = false;
  }

  addToCart() {
    if (this.user == undefined) {
      this.router.navigate(['../login']);
    } else {
      if (this.validateForm()) {
        this.selectedCartItem.productVariations = this.selectedVariations;
        this.cartItemService.save(this.cart.id).subscribe({
          next: (cartItem) => {
            if (
              !this.cart.cartItems.some(
                (c) => c.reference === cartItem.reference
              )
            ) {
              this.cart.cartItems.push(cartItem);
            } else {
              let existingCartItem = this.cart.cartItems.find(
                (c) => c.reference === cartItem.reference
              )!;
              existingCartItem.quantity = cartItem.quantity;
            }
            this.cartService.getCartTotal().subscribe({
              next: (data) => (this.cart.total = data),
              error: (error) => console.log(error),
            });
            this.selectedCartItem = new CartItem();
            this.router.navigate(['../products-list']);
          },
          error: (error) => console.log(error),
        });
      }
    }
  }

  searchReview() {
    let username = this.searchUsername;
    if (this.searchUsername === '') username = 'empty';
    this.reviewService
      .findByProductLabelAndUserUsernameContains(username)
      .subscribe({
        next: (reviews) => (this.reviews = reviews),
        error: (error) => console.log(error),
      });
  }

  deleteReview(username: string, label: string) {
    this.reviewService
      .deleteByUserUsernameAndProductLabel(username, label)
      .subscribe({
        next: () => {
          let index = this.reviews.findIndex(
            (r) => r.user.username === username
          );
          this.reviews.splice(index, 1);
        },
        error: (error) => console.log(error),
      });
  }

  saveReview() {
    if (
      this.selectedReview.description === undefined ||
      this.selectedReview.description === ''
    ) {
      this.validateReview = false;
    } else {
      this.validateReview = true;
      this.selectedReview.stars = this.selectedValue;
      this.reviewService.save().subscribe({
        next: (review) => {
          this.reviews.push(review);
          this.writeReview = false;
        },
        error: (error) => console.log(error),
      });
    }
  }

  updateReview(review: Review) {
    this.selectedReview = review;
    this.reviewService.update().subscribe({
      next: () => {
        this.selectedReview = new Review();
      },
      error: (error) => console.log(error),
    });
  }

  validateForm() {
    if (
      this.selectedCartItem.quantity === undefined ||
      this.selectedCartItem.quantity <= 0 ||
      this.selectedCartItem.quantity > this.selectedProduct.stock
    ) {
      this.validateQuantity = false;
      return false;
    } else {
      this.validateQuantity;
      return true;
    }
  }

  write() {
    this.writeReview = !this.writeReview;
    this.selectedReview = new Review();
    this.selectedReview.product = this.selectedProduct;
    this.selectedReview.user = this.user;
    this.selectedValue = 3;
  }

  check() {
    if (this.reviews.some((r) => r.user.username === this.user.username))
      return false;
    return true;
  }

  getYellowStarsArray(stars: number): any[] {
    const yellowStars = Math.floor(stars);
    return Array(yellowStars).fill(0);
  }

  getEmptyStarsArray(stars: number): any[] {
    const emptyStars = 5 - Math.floor(stars);
    return Array(emptyStars).fill(0);
  }

  getVariationGroups(): Array<{
    type: string;
    variations: ProductVariation[];
  }> {
    const variationGroups: Array<{
      type: string;
      variations: ProductVariation[];
    }> = [];

    this.selectedProduct.productVariations.forEach((variation) => {
      const group = variationGroups.find((vg) => vg.type === variation.type);
      if (group) {
        group.variations.push(variation);
      } else {
        variationGroups.push({ type: variation.type, variations: [variation] });
      }
    });

    return variationGroups;
  }

  selectVariation(variation: ProductVariation): void {
    const index = this.selectedVariations.findIndex(
      (v) => v.value === variation.value && v.type === variation.type
    );

    if (index === -1) {
      this.selectedVariations.push(variation);
    } else {
      this.selectedVariations.splice(index, 1);
    }
  }

  isSelected(variation: ProductVariation): boolean {
    return this.selectedVariations.some(
      (v) => v.value === variation.value && v.type === variation.type
    );
  }

  countStar(star: number) {
    this.selectedValue = star;
  }

  public get selectedProduct(): Product {
    return this.prodcutService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.prodcutService.selectedProduct = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }

  public get selectedCartItem(): CartItem {
    return this.cartItemService.selectedCartItem;
  }
  public set selectedCartItem(value: CartItem) {
    this.cartItemService.selectedCartItem = value;
  }
  public get cart(): Cart {
    return this.cartService.cart;
  }
  public set cart(value: Cart) {
    this.cartService.cart = value;
  }

  public get selectedReview(): Review {
    return this.reviewService.selectedReview;
  }
  public set selectedReview(value: Review) {
    this.reviewService.selectedReview = value;
  }
  public get reviews(): Array<Review> {
    return this.reviewService.reviews;
  }
  public set reviews(value: Array<Review>) {
    this.reviewService.reviews = value;
  }
}
