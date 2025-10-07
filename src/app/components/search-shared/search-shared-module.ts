import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchError } from './search-error/search-error';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchErrorFullscreen } from './search-error-fullscreen/search-error-fullscreen';
import { RouterModule } from '@angular/router';
import { SearchMovieResultGrid } from './search-movie-result-grid/search-movie-result-grid';
import { SearchMovieResultList } from './search-movie-result-list/search-movie-result-list';

@NgModule({
  declarations: [
    SearchError,
    SearchErrorFullscreen,
    SearchMovieResultGrid,
    SearchMovieResultList
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
    SearchMovieResultGrid,
    SearchMovieResultList
  ]
})
export class SearchSharedModule { }
