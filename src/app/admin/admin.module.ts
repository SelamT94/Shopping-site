import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new' , 
      component: ProductFormComponent,
      canActivate: [AuthGuardService,AdminAuthGuard]},

      { path: 'admin/products/:id' , 
      component: ProductFormComponent,
      canActivate: [AuthGuardService,AdminAuthGuard]},

      { path: 'admin/products' , 
      component: AdminProductsComponent,
      canActivate: [AuthGuardService,AdminAuthGuard]},

      { path: 'admin/orders' ,
       component: AdminOrdersComponent,
       canActivate: [AuthGuardService,AdminAuthGuard]},  

    ]),

    
  ], 
  
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent

  ],
  
  providers:[
    AuthGuardService
  ]
})
export class AdminModule { }
