import { Observable } from "rxjs";
import { ShoppingCartService } from "../shopping-cart.service";
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from "../models/shopping-cart";

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

}
