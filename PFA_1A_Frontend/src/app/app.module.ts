import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './view/wide/header/header.component';
import { FooterComponent } from './view/wide/footer/footer.component';
import { HomeComponent } from './view/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './view/products/products-list/products-list.component';
import { ProductsCreateComponent } from './view/products/products-create/products-create.component';
import { ProductsViewComponent } from './view/products/products-view/products-view.component';
import { GroupByPipe } from './util/group-by.pipe';
import { ProductsEditComponent } from './view/products/products-edit/products-edit.component';
import { LoginComponent } from './view/login-register/login/login.component';
import { RegisterComponent } from './view/login-register/register/register.component';
import { ProfileComponent } from './view/profile/profile.component';
import { DatePipe } from '@angular/common';
import { CartComponent } from './view/cart/cart.component';
import { WishListComponent } from './view/wish-list/wish-list.component';
import { OrderViewComponent } from './view/order-view/order-view.component';
import { UsersComponent } from './view/users/users.component';
import { OrdersViewComponent } from './view/orders-view/orders-view.component';
import { StatisticsComponent } from './view/statistics/statistics.component';
import { AboutUsComponent } from './view/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsListComponent,
    ProductsCreateComponent,
    ProductsViewComponent,
    GroupByPipe,
    ProductsEditComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    WishListComponent,
    OrderViewComponent,
    UsersComponent,
    OrdersViewComponent,
    StatisticsComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
