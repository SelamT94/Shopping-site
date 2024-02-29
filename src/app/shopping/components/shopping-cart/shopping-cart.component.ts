import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart | null> = new Observable<ShoppingCart | null>(undefined); 
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    const cart = await this.cartService.getCart();
    this.cart$ = cart ? cart: new Observable<ShoppingCart | null>();
      }

  clearCart() { 
    this.cartService.clearCart();
  }
}
