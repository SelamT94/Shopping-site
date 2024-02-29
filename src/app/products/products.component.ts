import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{
  products : Product[] = [];
  filteredProducts: Product[] = [];
  category!:string;
  subscription!:Subscription;
  cart$: Observable<ShoppingCart | null> = new Observable<ShoppingCart | null>(undefined); 

  constructor (
    private route:ActivatedRoute,
    private productService:ProductService,
    private cartService: ShoppingCartService
    ){}


      async ngOnInit() {
        const cart = await this.cartService.getCart();
        this.cart$ = cart ? cart : new Observable<ShoppingCart | null>();
        this.populateProducts();
       }
    
       private populateProducts() { 
        this.productService
          .getAll()
          .pipe(
            switchMap((products: Product[]) => {
              this.products = products;
              return this.route.queryParamMap;
            })
          )
          .subscribe((params: any) => {
            this.category = params.get('category');
            this.applyFilter();      
          });
      }
    
    
      private applyFilter() { 
        this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category === this.category) : 
        this.products;
      }
      
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }  }
}
