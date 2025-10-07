import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing-module';
import { Search } from './search';
import { SearchMovie } from './search-movie/search-movie';
import { SearchPerson } from './search-person/search-person';
import { SearchMain } from './search-main/search-main';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared/shared-module';
import { SearchSharedModule } from '../components/search-shared/search-shared-module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    Search,
    SearchMovie,
    SearchPerson,
    SearchMain
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SearchSharedModule,
    NgxPaginationModule
  ]
})
export class SearchModule { }
