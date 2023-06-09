import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/controller/categorie/categorie.service';
import { ProductService } from 'src/app/controller/product/product.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Categorie } from 'src/app/model/categorie/categorie';
import { Product } from 'src/app/model/product/product';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  public searchLabel: string = '';
  public filterPriceCount: Array<number> = new Array<number>();
  public filterCategorieCount: Array<number> = new Array<number>();
  public prices: Array<number> = new Array<number>();
  public productsCount!: number;
  constructor(
    private productService: ProductService,
    private router: Router,
    private categorieService: CategorieService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.selectedProduct = new Product();
    this.prices.push(0);
    this.prices.push(100);
    this.prices.push(200);
    this.prices.push(300);
    this.prices.push(400);
    this.prices.push(500);
    this.prices.push(1000000);
    this.countByPriceBetween(this.prices[0], this.prices[1]);
    this.countByPriceBetween(this.prices[1], this.prices[2]);
    this.countByPriceBetween(this.prices[2], this.prices[3]);
    this.countByPriceBetween(this.prices[3], this.prices[4]);
    this.countByPriceBetween(this.prices[4], this.prices[5]);
    this.countByPriceBetween(this.prices[5], this.prices[6]);
    this.categories.forEach((c) =>
      this.productService.countByCategorieLabel(c.label).subscribe({
        next: (data) => this.filterCategorieCount.push(data),
        error: (error) => console.log(error),
      })
    );
  }

  searchProduct() {
    this.productService.findByLabelContains(this.searchLabel).subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log(error),
    });
  }

  viewProduct(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['products-view']);
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['products-edit']);
  }

  deleteProduct(label: string) {
    this.productService.deleteByLabel(label).subscribe({
      next: (data) => {
        if (data !== 0) {
          this.products = this.products.filter(
            (product) => product.label !== label
          );
          this.productsCount = this.products.length;
        }
      },
    });
  }

  addToWishList(label: string) {
    if (this.user == undefined) {
      this.router.navigate(['../login']);
    } else {
      this.userService.addToWishList(label).subscribe({
        next: (data) => {
          if (data !== -1) {
            let product = this.products.find((p) => p.label === label)!;
            this.user.wishList.push(product);
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  public findByPriceBetween(lowerBoundPrice: number, higherBoundPrice: number) {
    this.productService
      .findByPriceBetween(lowerBoundPrice, higherBoundPrice)
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => console.log(error),
      });
  }

  public countByPriceBetween(
    lowerBoundPrice: number,
    higherBoundPrice: number
  ) {
    let count: number;
    this.productService
      .countByPriceBetween(lowerBoundPrice, higherBoundPrice)
      .subscribe({
        next: (count) => this.filterPriceCount.push(count),
        error: (error) => console.log(error),
      });
  }

  getYellowStarsArray(stars: number): any[] {
    const yellowStars = Math.floor(stars);
    return Array(yellowStars).fill(0);
  }

  getEmptyStarsArray(stars: number): any[] {
    const emptyStars = 5 - Math.floor(stars);
    return Array(emptyStars).fill(0);
  }

  handlePriceSelection(priceRange: string) {
    let lowerBound: number;
    let higherBound: number;

    switch (priceRange) {
      case 'all':
        lowerBound = 0;
        higherBound = this.prices[6];
        break;
      case '1':
        lowerBound = 0;
        higherBound = this.prices[1];
        break;
      case '2':
        lowerBound = this.prices[1];
        higherBound = this.prices[2];
        break;
      case '3':
        lowerBound = this.prices[2];
        higherBound = this.prices[3];
        break;
      case '4':
        lowerBound = this.prices[3];
        higherBound = this.prices[4];
        break;
      case '5':
        lowerBound = this.prices[4];
        higherBound = this.prices[5];
        break;
      case '6':
        lowerBound = this.prices[5];
        higherBound = this.prices[6];
        break;
      default:
        lowerBound = 0;
        higherBound = Infinity;
    }
    this.findByPriceBetween(lowerBound, higherBound);
  }

  handleCategorieSelection(label: string) {
    if (label === 'allCategories') {
      this.productService
        .findAll()
        .subscribe({ next: (products) => (this.products = products) });
    } else {
      this.productService
        .findByCategorieLabel(label)
        .subscribe({ next: (products) => (this.products = products) });
    }
  }
  public get selectedProduct(): Product {
    return this.productService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.productService.selectedProduct = value;
  }
  public get products(): Array<Product> {
    return this.productService.products;
  }
  public set products(value: Array<Product>) {
    this.productService.products = value;
  }

  public get categories(): Array<Categorie> {
    return this.categorieService.categories;
  }
  public set categories(value: Array<Categorie>) {
    this.categorieService.categories = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
