import { ProductVariation } from 'src/app/model/product-variation/product-variation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/controller/categorie/categorie.service';
import { ProductService } from 'src/app/controller/product/product.service';
import { Categorie } from 'src/app/model/categorie/categorie';
import { Product } from 'src/app/model/product/product';
import { UserService } from 'src/app/controller/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class ProductsCreateComponent implements OnInit {
  public image_src!: string;
  public variations!: Array<ProductVariation>;
  public validateLabel!: boolean;
  public validatePrice!: boolean;
  public validateStock!: boolean;
  public validateCategorie!: boolean;
  public validateDescription!: boolean;
  public validateImage!: boolean;
  public validateVariations!: boolean;
  public validateExistence!: boolean;

  constructor(
    private categorieService: CategorieService,
    private prodcutService: ProductService,
    public router: Router,
    private userService: UserService
  ) {
    this.image_src = '../../../../../assets/img/products/';
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.selectedProduct = new Product();
    this.variations = new Array<ProductVariation>();
    this.validateLabel = true;
    this.validatePrice = true;
    this.validateStock = true;
    this.validateCategorie = true;
    this.validateDescription = true;
    this.validateImage = true;
    this.validateVariations = true;
    this.validateExistence = true;
  }

  save() {
    if (this.validateForm()) {
      this.selectedProduct.image = this.image_src + this.selectedProduct.image;
      this.selectedProduct.productVariations = this.variations;
      this.prodcutService.save().subscribe({
        next: (product) => {
          if (product !== null) {
            this.products.push(product);
            this.selectedProduct = new Product();
            this.router.navigate(['../products-list']);
          } else {
            this.validateExistence = false;
          }
        },
      });
    }
  }

  validateForm() {
    let counter = 0;
    if (
      this.selectedProduct.label === undefined ||
      this.selectedProduct.label === ''
    ) {
      this.validateLabel = false;
      counter++;
    } else this.validateLabel = true;
    if (
      this.selectedProduct.price === undefined ||
      this.selectedProduct.price <= 0 ||
      this.selectedProduct.price.toString() === ''
    ) {
      this.validatePrice = false;
      counter++;
    } else this.validatePrice = true;
    if (
      this.selectedProduct.stock === undefined ||
      this.selectedProduct.stock <= 0 ||
      this.selectedProduct.stock.toString() === ''
    ) {
      this.validateStock = false;
      counter++;
    } else this.validateStock = true;
    if (this.selectedProduct.categorie === undefined) {
      this.validateCategorie = false;
      counter++;
    } else this.validateCategorie = true;
    if (
      this.selectedProduct.description === undefined ||
      this.selectedProduct.description === ''
    ) {
      this.validateDescription = false;
      counter++;
    } else this.validateDescription = true;
    if (
      this.selectedProduct.image === undefined ||
      this.selectedProduct.image === ''
    ) {
      this.validateImage = false;
      counter++;
    } else this.validateImage = true;
    if (
      this.variations.some((variation) => {
        return (
          variation.type === undefined ||
          variation.type === '' ||
          variation.value === undefined ||
          variation.value === ''
        );
      })
    ) {
      this.validateVariations = false;
      counter++;
    } else this.validateVariations = true;
    if (counter === 0) return true;
    else return false;
  }

  add() {
    let variation = new ProductVariation();
    this.variations.push(variation);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedProduct.image = file.name;
  }

  public get categories(): Array<Categorie> {
    return this.categorieService.categories;
  }
  public set categories(value: Array<Categorie>) {
    this.categorieService.categories = value;
  }

  public get selectedProduct(): Product {
    return this.prodcutService.selectedProduct;
  }
  public set selectedProduct(value: Product) {
    this.prodcutService.selectedProduct = value;
  }
  public get products(): Array<Product> {
    return this.prodcutService.products;
  }
  public set products(value: Array<Product>) {
    this.prodcutService.products = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
