import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchError } from './search-error/search-error';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchErrorFullscreen } from './search-error-fullscreen/search-error-fullscreen';
import { SearchMovieResult } from './search-movie-result/search-movie-result';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchError,
    SearchErrorFullscreen,
    SearchMovieResult
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    SearchError,
    SearchErrorFullscreen,
    SearchMovieResult
  ]
})
export class SearchSharedModule { }
