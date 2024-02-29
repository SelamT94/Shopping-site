import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ='wshop';
  constructor (private userService: UserService, private auth : AuthService, router:Router){
    auth.user$.subscribe((user: any) => {
      if (!user)  return;
      this.userService.save(user as User | any);
        let returnUrl = localStorage.getItem('returnUrl');
        
        if (!returnUrl)  return;
        localStorage.removeItem('returnUrl')
        router.navigateByUrl(returnUrl);
      
  })
}
}


