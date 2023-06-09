import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/controller/product/product.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Product } from 'src/app/model/product/product';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public featuredProducts!: Array<Product>;
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  shopCarousel: Array<{
    imgSrc: string;
    title: string;
    paragraph: string;
    buttonString: string;
  }> = [
    {
      imgSrc: '../../../assets/img/carousels/carousel-1.jpg',
      title: 'Men Fashion',
      paragraph:
        'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      buttonString: 'Shop Now',
    },
    {
      imgSrc: '../../../assets/img/carousels/carousel-2.jpg',
      title: 'Women Fashion',
      paragraph:
        'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      buttonString: 'Shop Now',
    },
    {
      imgSrc: '../../../assets/img/carousels/carousel-3.jpg',
      title: 'Kids Fashion',
      paragraph:
        'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      buttonString: 'Shop Now',
    },
  ];
  slides: Array<{
    imgSrc: string;
    title: string;
    paragraph: string;
    buttonString: string;
  }> = [
    {
      imgSrc: '../../../assets/img/slides/offer.jpg',
      title: 'Save 35%',
      paragraph: 'Summer Discounts',
      buttonString: 'Shop Now',
    },
    {
      imgSrc: '../../../assets/img/slides/outlets.png',
      title: 'Our',
      paragraph: 'Outlets',
      buttonString: 'Visit Us',
    },
  ];
  cityCarousel: Array<{ imgSrc: string; title: string; paragraph: string }> = [
    {
      imgSrc: '../../../assets/img/cities/marrakech.jpg',
      title: 'Marrakech',
      paragraph: 'Menara Mall',
    },
    {
      imgSrc: '../../../assets/img/cities/casablanca.jpg',
      title: 'Casablanca',
      paragraph: 'Morocco Mall',
    },
    {
      imgSrc: '../../../assets/img/cities/rabat.jpg',
      title: 'Rabat',
      paragraph: 'Mega Mall',
    },
  ];

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.products === undefined || this.products.length === 0) {
      this.productService.findAll().subscribe({
        next: (products) => (this.featuredProducts = products.slice(0, 4)),
      });
    } else {
      this.featuredProducts = this.products.slice(0, 4);
    }
  }

  viewProduct(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['products-view']);
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

  openShop() {
    this.productService.findAll().subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log(error),
    });
    this.router.navigate(['products-list']);
  }

  getYellowStarsArray(stars: number): any[] {
    const yellowStars = Math.floor(stars);
    return Array(yellowStars).fill(0);
  }

  getEmptyStarsArray(stars: number): any[] {
    const emptyStars = 5 - Math.floor(stars);
    return Array(emptyStars).fill(0);
  }
  public get products(): Array<Product> {
    return this.productService.products;
  }
  public set products(value: Array<Product>) {
    this.productService.products = value;
  }

  public get selectedProduct(): Product {
    return this.productService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.productService.selectedProduct = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
