import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
 
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser: AppUser) => appUser.isAdmin)
    );
   
  } 
  }


  

