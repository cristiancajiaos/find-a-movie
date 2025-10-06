import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing-module';
import { Search } from './search';
import { SearchMovie } from './search-movie/search-movie';
import { SearchPerson } from './search-person/search-person';
import { SearchMain } from './search-main/search-main';


@NgModule({
  declarations: [
    Search,
    SearchMovie,
    SearchPerson,
    SearchMain
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
