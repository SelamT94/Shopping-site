import { AuthGuardService } from 'shared/services/auth-guard.service';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NgModule } from '@angular/core';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from 'app/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/products/products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent    
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products' , component: ProductsComponent},
      { path: 'shopping-cart' , component: ShoppingCartComponent},
      { path: 'check-out' , component: CheckOutComponent, canActivate: [AuthGuardService]},
      { path: 'order-success/:id' , component: OrderSuccessComponent,canActivate: [AuthGuardService]},
      { path: 'my/orders' , component: MyOrdersComponent,canActivate: [AuthGuardService]},

    ])
  ]
})
export class ShoppingModule { }
