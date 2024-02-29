import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from "@angular/fire/compat";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule, 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    RouterModule.forRoot([
      { path: '' , component: ProductsComponent},
      { path: 'login', component:LoginComponent},
    ]),
  ],
  providers: [AppModule],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
