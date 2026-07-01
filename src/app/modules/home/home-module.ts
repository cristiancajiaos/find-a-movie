import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeMovie } from './home-movie/home-movie';
import { HomePerson } from './home-person/home-person';
import { LayoutModule } from '../../components/layout/layout-module';
import { HomeNowPlaying } from './home-now-playing/home-now-playing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeUpcoming } from './home-upcoming/home-upcoming';

@NgModule({
  declarations: [
    Home,
    HomeMovie,
    HomePerson,
    HomeNowPlaying,
    HomeUpcoming
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    LayoutModule,
    NgbModule,
    RouterModule
  ]
})
export class HomeModule { }
