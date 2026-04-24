import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputMovie } from './navbar/search-input-movie/search-input-movie';
import { SearchInputMovieResult } from './navbar/search-input-movie/search-input-movie-result/search-input-movie-result';
import { SearchInputPerson } from './navbar/search-input-person/search-input-person';

@NgModule({
  declarations: [
    Layout,
    Navbar,
    Footer,
    SearchInputMovie,
    SearchInputMovieResult,
    SearchInputPerson
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    Layout,
    Navbar,
    Footer,
    SearchInputMovie,
    SearchInputMovieResult,
    SearchInputPerson
  ]
})
export class LayoutModule { }
