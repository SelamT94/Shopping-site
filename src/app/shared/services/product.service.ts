import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product :any) {
   return this.db.list('/products').push(product)
  }

  getAll(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          const data: any = c.payload.val();
          return { id: c.payload.key, ...data } as any;
        });
      })
    );
  }

  get(productId: string): AngularFireObject<any> {
    return this.db.object('products/' + productId);
  }

  update(productId: string, product: any){
    return this.db.object('/products/' + productId).update(product)
  }

  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }
}
