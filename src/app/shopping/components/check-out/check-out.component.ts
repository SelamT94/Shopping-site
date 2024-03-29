import { Component, OnInit } from '@angular/core';

import { AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  cart$! : Observable <ShoppingCart | null>; 
   
  constructor( private shoppingCartService: ShoppingCartService){}

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();    
     }

}

