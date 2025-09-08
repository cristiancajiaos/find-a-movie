import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNotFound } from './movie-not-found/movie-not-found';



@NgModule({
  declarations: [
    MovieNotFound
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieNotFound
  ]
})
export class MovieSharedModule { }
