import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/controller/categorie/categorie.service';
import { ProductService } from 'src/app/controller/product/product.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Categorie } from 'src/app/model/categorie/categorie';
import { Product } from 'src/app/model/product/product';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public newCategorieLabel!: string;
  public oldCategorieLabel!: string;
  public validateCategorieLabel!: boolean;
  public validateNewCategorieLabel!: boolean;
  public validateOldCategorieLabel!: boolean;
  public validateAddLabelExistence!: boolean;
  public validateEditLabelExistence!: boolean;
  public validateSelectCategorie!: boolean;
  constructor(
    private categorieService: CategorieService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.categorieService.findAll().subscribe({
      next: (categories) => {
        this.categorieService.categories = categories;
      },
      error: (error) => console.log(error),
    });
    this.selectedCategorie = new Categorie();
    this.validateOldCategorieLabel = true;
    this.validateNewCategorieLabel = true;
    this.validateCategorieLabel = true;
    this.validateAddLabelExistence = true;
    this.validateEditLabelExistence = true;
    this.validateSelectCategorie = true;
  }

  deleteByLabel(label: string) {
    this.categorieService.deleteByLabel(label).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c.label !== label);
        this.router.navigate(['']);
      },
      error: (error) => console.log(error),
    });
  }

  save() {
    if (this.validateAddForm()) {
      this.categorieService.save().subscribe({
        next: (categorie) => {
          if (categorie !== null) {
            this.categories.push(categorie);
            this.validateAddLabelExistence = true;
            this.selectedCategorie = new Categorie();
          } else {
            this.validateAddLabelExistence = false;
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  update() {
    if (this.validateEditForm()) {
      this.selectedCategorie = this.categories.find(
        (c) => c.label === this.oldCategorieLabel
      ) as Categorie;
      this.selectedCategorie.label = this.newCategorieLabel;
      this.categorieService.update().subscribe({
        next: (data) => {
          if (data === -1) {
            this.selectedCategorie.label = this.oldCategorieLabel;
            this.validateEditLabelExistence = false;
          } else {
            this.oldCategorieLabel = this.newCategorieLabel;
            this.newCategorieLabel = '';
            this.validateEditLabelExistence = true;
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  openCategorie(label: string) {
    if (label !== 'allCategories') {
      this.productService.findByCategorieLabel(label).subscribe({
        next: (products) => (this.products = products),
        error: (error) => console.log(error),
      });
    } else {
      this.productService.findAll().subscribe({
        next: (products) => (this.products = products),
        error: (error) => console.log(error),
      });
    }
    this.router.navigate(['products-list']);
  }

  openShop() {
    this.productService.findAll().subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log(error),
    });
    this.router.navigate(['products-list']);
  }

  openCart() {
    if (this.user === undefined || this.user.username === undefined)
      this.router.navigate(['login']);
    else this.router.navigate(['cart']);
  }

  openWishList() {
    if (this.user === undefined || this.user.username === undefined)
      this.router.navigate(['login']);
    else this.router.navigate(['wish-list']);
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/']);
  }

  validateAddForm() {
    if (
      this.selectedCategorie.label === undefined ||
      this.selectedCategorie.label === ''
    ) {
      this.validateCategorieLabel = false;
      return false;
    }
    this.validateCategorieLabel = true;
    return true;
  }

  validateEditForm(): boolean {
    let count = 0;
    if (this.newCategorieLabel === undefined || this.newCategorieLabel === '') {
      this.validateNewCategorieLabel = false;
      count++;
    } else this.validateNewCategorieLabel = true;
    if (
      this.oldCategorieLabel === undefined ||
      this.oldCategorieLabel === 'Select categorie' ||
      this.oldCategorieLabel === ''
    ) {
      this.validateSelectCategorie = false;
      count++;
    } else this.validateSelectCategorie = true;
    if (count === 0) return true;
    return false;
  }

  extractCategorieLabel(event: any) {
    this.oldCategorieLabel = event.target.value;
  }

  close() {
    this.selectedCategorie = new Categorie();
  }

  public get selectedCategorie(): Categorie {
    return this.categorieService.selectedCategorie;
  }
  public set selectedCategorie(value: Categorie) {
    this.categorieService.selectedCategorie = value;
  }

  public get categories(): Array<Categorie> {
    return this.categorieService.categories;
  }
  public set categories(value: Array<Categorie>) {
    this.categorieService.categories = value;
  }

  public get products(): Array<Product> {
    return this.productService.products;
  }
  public set products(value: Array<Product>) {
    this.productService.products = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
