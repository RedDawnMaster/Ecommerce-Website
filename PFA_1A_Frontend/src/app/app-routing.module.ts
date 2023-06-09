import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ProductsListComponent } from './view/products/products-list/products-list.component';
import { ProductsCreateComponent } from './view/products/products-create/products-create.component';
import { ProductsViewComponent } from './view/products/products-view/products-view.component';
import { ProductsEditComponent } from './view/products/products-edit/products-edit.component';
import { LoginComponent } from './view/login-register/login/login.component';
import { RegisterComponent } from './view/login-register/register/register.component';
import { ProfileComponent } from './view/profile/profile.component';
import { CartComponent } from './view/cart/cart.component';
import { WishListComponent } from './view/wish-list/wish-list.component';
import { OrderViewComponent } from './view/order-view/order-view.component';
import { UsersComponent } from './view/users/users.component';
import { OrdersViewComponent } from './view/orders-view/orders-view.component';
import { StatisticsComponent } from './view/statistics/statistics.component';
import { AboutUsComponent } from './view/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
  },
  {
    path: 'products-create',
    component: ProductsCreateComponent,
  },
  {
    path: 'products-view',
    component: ProductsViewComponent,
  },
  {
    path: 'products-edit',
    component: ProductsEditComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'wish-list',
    component: WishListComponent,
  },
  {
    path: 'order-view',
    component: OrderViewComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'orders-view',
    component: OrdersViewComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
