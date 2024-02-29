import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit , OnDestroy  {
  @Input ('cart') cart? :ShoppingCart;
  //initialzed shipping i dont if its gone cause any issue 
  shipping: { name: string, addressLine1: string, addressLine2: string, city: string } = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  //shipping!: {}; 
  userSubscription!:Subscription;
  userId:string = '';
 
  constructor(
    private router :Router,
    private authService: AuthService,
    private orderService :OrderService){}

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe((user: any) => {
      this.userId = user.uid;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    if (!this.cart) {
      console.error("Cart is undefined");
      return;
    }
    let order = new Order(this.userId, this.shipping, this.cart);
     let result = await this.orderService.placeOrder(order);
     this.router.navigate(['/order-success', result.key])
 }
}
