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
import { SharedModule } from '../../components/shared/shared-module';
import { SearchSharedModule } from '../../components/search-shared/search-shared-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchMainMovie } from './search-main/search-main-movie/search-main-movie';
import { SearchMainPerson } from './search-main/search-main-person/search-main-person';
import { LayoutModule } from '../../components/layout/layout-module';

@NgModule({
  declarations: [Search, SearchMovie, SearchPerson, SearchMain, SearchMainMovie, SearchMainPerson],
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
    NgxPaginationModule,
    LayoutModule
  ],
})
export class SearchModule {}
