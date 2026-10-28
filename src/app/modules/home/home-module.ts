import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '../../components/layout/layout-module';
import { HomeTrending } from './home-trending/home-trending';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlideTrending } from './home-trending/slide-trending/slide-trending';
import { HomeSharedModule } from '../../components/home-shared/home-shared-module';


@NgModule({
  declarations: [
    Home,
    HomeTrending,
    SlideTrending
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    LayoutModule,
    NgbModule,
    HomeSharedModule
  ]
})
export class HomeModule { }
