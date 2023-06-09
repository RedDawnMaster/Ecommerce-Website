import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/controller/categorie/categorie.service';
import { ProductVariationService } from 'src/app/controller/product-variation/product-variation.service';
import { ProductService } from 'src/app/controller/product/product.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Categorie } from 'src/app/model/categorie/categorie';
import { ProductVariation } from 'src/app/model/product-variation/product-variation';
import { Product } from 'src/app/model/product/product';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  public image_src!: string;
  public validateLabel!: boolean;
  public validatePrice!: boolean;
  public validateStock!: boolean;
  public validateCategorie!: boolean;
  public validateDescription!: boolean;
  public validateImage!: boolean;
  public validateExistence!: boolean;
  public validateVariations!: boolean;

  constructor(
    private categorieService: CategorieService,
    private prodcutService: ProductService,
    private productVariationService: ProductVariationService,
    public router: Router,
    private userService: UserService
  ) {
    this.image_src = '../../../../../assets/img/products/';
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.validateLabel = true;
    this.validatePrice = true;
    this.validateStock = true;
    this.validateCategorie = true;
    this.validateDescription = true;
    this.validateImage = true;
    this.validateExistence = true;
    this.validateVariations = true;
  }

  update() {
    if (this.validateForm()) {
      this.productVariationService.findByProductLabel().subscribe({
        next: (productVariations) =>
          (this.selectedProduct.productVariations = productVariations),
        error: (error) => console.log(error),
      });
      this.prodcutService.update().subscribe({
        next: (data) => {
          if (data !== -1) {
            this.router.navigate(['../products-list']);
          } else {
            this.validateExistence = false;
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  deleteVariation(productVariation: ProductVariation) {
    this.selectedProductVariation = productVariation;
    this.productVariationService
      .deleteByProductLabelAndTypeAndValue(
        this.selectedProduct.label,
        productVariation.type,
        productVariation.value
      )
      .subscribe({
        next: () => {
          let index = this.selectedProduct.productVariations.findIndex(
            (p) =>
              p.type !== this.selectedProductVariation.type &&
              p.value !== this.selectedProductVariation.value
          );
          this.selectedProduct.productVariations.splice(index, 1);

          this.selectedProductVariation = productVariation;
        },
        error: (error) => console.log(error),
      });
  }

  updateVariation(productVariation: ProductVariation) {
    this.selectedProductVariation = productVariation;
    this.productVariationService.update().subscribe({
      next: (data) => {
        if (data === -1) this.validateVariations = false;
        else this.validateVariations = true;
        this.selectedProductVariation = productVariation;
      },
      error: (error) => console.log(error),
    });
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
    if (counter === 0) return true;
    else return false;
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

  public get selectedProductVariation(): ProductVariation {
    return this.productVariationService.selectedProductVariation;
  }
  public set selectedProductVariation(value: ProductVariation) {
    this.productVariationService.selectedProductVariation = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
