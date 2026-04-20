import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchMovie } from './navbar/search-movie/search-movie';
import { SearchPerson } from './navbar/search-person/search-person';

@NgModule({
  declarations: [
    Layout,
    Navbar,
    Footer,
    SearchMovie,
    SearchPerson
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
    SearchMovie,
    SearchPerson
  ]
})
export class LayoutModule { }
