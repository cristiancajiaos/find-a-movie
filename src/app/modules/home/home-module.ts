import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeMovie } from './home-movie/home-movie';
import { HomePerson } from './home-person/home-person';
import { LayoutModule } from '../../components/layout/layout-module';
import { HomeTrending } from './home-trending/home-trending';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    Home,
    HomeMovie,
    HomePerson,
    HomeTrending
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    LayoutModule,
    NgbModule
  ]
})
export class HomeModule { }
