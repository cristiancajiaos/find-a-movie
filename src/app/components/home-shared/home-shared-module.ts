import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTrendingError } from './home-trending-error/home-trending-error';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HomeTrendingError
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HomeTrendingError
  ]
})
export class HomeSharedModule { }
