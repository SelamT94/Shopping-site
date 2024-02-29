import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  async save (user : User){
    console.log('SavingUser', user);
   
    try{
   await this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
    console.log(' saved');
    } 
    catch(error) {
      const errorMessage = (error as Error)?.message || 'An unknown error occurred';
      console.error('Error while saving:', errorMessage);
    };
  }
    get(uid: string): Observable<any> {
      return this.db.object<AppUser>('/users/' + uid).valueChanges();

}
}
