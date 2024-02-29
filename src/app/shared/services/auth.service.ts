import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
import { Observable, map, of, switchMap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppUser } from 'shared/models/app-user';
import { Injectable } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { environment } from 'environments/environment';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;
  
  constructor(
    private userService :UserService,
    private afAuth: AngularFireAuth,  
    private router: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }
  login() {
   const returnUrl=  this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl' , returnUrl);

    const firebaseConfig = environment.firebase;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    this.afAuth.signInWithRedirect(provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log('Error during Google login:', error);
      });
  }
  logOut() {
    this.afAuth.signOut();
  }
  
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        if (user && user.uid) {
          return this.userService.get(user.uid);
        } else {
          return of(null); 
          //throw new Error("User is null or user.uid is missing.");
        }
      })
    );

  }
}
