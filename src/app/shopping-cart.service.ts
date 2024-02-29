import { Injectable } from '@angular/core';
import { AngularFireDatabase ,AngularFireObject} from '@angular/fire/compat/database';
import { Product } from './models/product';
import {take,map, Observable} from 'rxjs'
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`)
    .valueChanges()
   .pipe(map((x:any) => new ShoppingCart(x.items))
  );
  }
  
  async addToCart(product: Product) {
    this.updateItem(product,1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId= await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
      
    let result = await this.create(); 
      cartId = result.key!;
      localStorage.setItem('cartId', cartId);
      return cartId;
    
  }


  private async updateItem(product:Product ,change :number){
    let cartId = await this.getOrCreateCartId(); 
    if (typeof cartId === 'string') {
      let item$ = this.getItem(cartId, product.id);
      item$
        .valueChanges()
        .pipe(take(1))
        .subscribe((item: any) => {
          let quantity= (item?.quantity || 0) + change;
      if (quantity===0) {item$.remove();
                          item$.set({items: {}});}
      else
          item$.update({   
              title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
           });
        });
    }

  }

}
