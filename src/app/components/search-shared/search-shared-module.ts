import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchError } from './search-error/search-error';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchErrorFullscreen } from './search-error-fullscreen/search-error-fullscreen';
import { RouterModule } from '@angular/router';
import { SearchMovieResultGrid } from './search-movie-result-grid/search-movie-result-grid';
import { SearchMovieResultList } from './search-movie-result-list/search-movie-result-list';
import { SearchPersonResultGrid } from './search-person-result-grid/search-person-result-grid';
import { SearchPersonResultList } from './search-person-result-list/search-person-result-list';
import { SearchInputMovie } from './search-input-movie/search-input-movie';
import { SearchInputMovieResult } from './search-input-movie/search-input-movie-result/search-input-movie-result';
import { SearchInputPerson } from './search-input-person/search-input-person';
import { SearchInputPersonResult } from './search-input-person/search-input-person-result/search-input-person-result';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchError,
    SearchErrorFullscreen,
    SearchMovieResultGrid,
    SearchMovieResultList,
    SearchPersonResultGrid,
    SearchPersonResultList,
    SearchInputMovie,
    SearchInputMovieResult,
    SearchInputPerson,
    SearchInputPersonResult
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchError,
    SearchErrorFullscreen,
    SearchMovieResultGrid,
    SearchMovieResultList,
    SearchPersonResultGrid,
    SearchPersonResultList,
    SearchInputMovie,
    SearchInputMovieResult,
    SearchInputPerson,
    SearchInputPersonResult
  ]
})
export class SearchSharedModule { }
