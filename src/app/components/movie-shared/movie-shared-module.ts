import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNotFound } from './movie-not-found/movie-not-found';
import { MovieError } from './movie-error/movie-error';
import { MovieErrorFullscreen } from './movie-error-fullscreen/movie-error-fullscreen';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MovieNotFound,
    MovieError,
    MovieErrorFullscreen
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    MovieNotFound,
    MovieError,
    MovieErrorFullscreen
  ]
})
export class MovieSharedModule { }
