// import { ShoppingCartItem } from "./shopping-cart-item";

// export class ShoppingCart {
//     items:ShoppingCartItem[]=[];
//     constructor(private itemsMap:{[productId:string]: ShoppingCartItem}) {
//     //    this. itemsMap=itemsMap ||{};

//     //     for (let productId in itemsMap){
//     //         let item=itemsMap[productId];
//     //         this.items.push(new ShoppingCartItem({...itemsMap,id: productId}));
//     // }
// }

//     // getQuantity() {
//     //     if (!this.shoppingCart) return 0;
      
//     //     let item = this.shoppingCart.items[this.product.id];
//     //     const quantity = item ? item.quantity : 0;
//     //     console.log('Quantity:', quantity); // Debug statement
//     //     return quantity;
//     //   }
    
//     // get productIds(){
//     //    return Object.keys(this.items)
//     // }


//     // get totalItemsCount() {
//     //     let count = 0;
//     //     for (let productId in this.items)
//     //         count += this.items[productId].quantity;
//     //         return count;
//     // }
// }
import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart { 
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, id: productId }));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }
  
  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) 
      sum += this.items[productId].totalPrice;
    return sum;
  }
  
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) 
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
