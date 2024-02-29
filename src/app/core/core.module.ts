import { Router, RouterModule } from '@angular/router';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent  
  ],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
