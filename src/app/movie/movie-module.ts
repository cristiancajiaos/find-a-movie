import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing-module';
import { Movie } from './movie';


@NgModule({
  declarations: [
    Movie
  ],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
