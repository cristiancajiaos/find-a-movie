import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNotFound } from './movie-not-found/movie-not-found';
import { MovieError } from './movie-error/movie-error';
import { MovieErrorFullscreen } from './movie-error-fullscreen/movie-error-fullscreen';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieVideo } from './movie-video/movie-video';
import { PipesModule } from '../../pipes/pipes-module';

@NgModule({
  declarations: [
    MovieNotFound,
    MovieError,
    MovieErrorFullscreen,
    MovieVideo
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    MovieNotFound,
    MovieError,
    MovieErrorFullscreen,
    MovieVideo
  ]
})
export class MovieSharedModule { }
