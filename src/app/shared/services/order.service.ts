import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,
    private shoppingCartService:ShoppingCartService) { }

  async placeOrder(order : Order){
  let result = await this.db.list('/orders').push(order);
  this.shoppingCartService.clearCart();
  return result;
}

getOrders(): Observable<Order[]> { // Return Observable<Order[]>
  return this.db.list<Order>('/orders').valueChanges(); // Assume your orders are of type Order
}

  getOrderByUser(userId: string) {
    return this.db.list('/orders', ref => 
      ref.orderByChild('userId').equalTo(userId)
    ).valueChanges(); // You can also use snapshotChanges() if you need metadata
  }

}
