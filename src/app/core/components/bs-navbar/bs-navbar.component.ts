import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser | undefined;
  cart$: Observable<ShoppingCart| null>=EMPTY;

  shoppingCartItemCount: number=0;
  constructor(private auth: AuthService, private cartService :ShoppingCartService){ 
   
  }

  async ngOnInit(){
   this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   this.cart$ = (await this.cartService.getCart());

  }
    logout() {
   this.auth.logOut();
   }

}
