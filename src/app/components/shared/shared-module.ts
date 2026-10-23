import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisplaySelector } from './display-selector/display-selector';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FromSelect } from './from-select/from-select';
import { ToSelect } from './to-select/to-select';
import { RoleSelect } from './role-select/role-select';
import { Loading } from './loading/loading';
import { Pagination } from './pagination/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowXResults } from './show-x-results/show-x-results';
import { ResetFilters } from './reset-filters/reset-filters';
import { SortSelect } from './sort-select/sort-select';

@NgModule({
  declarations: [
    Loading,
    DisplaySelector,
    FromSelect,
    ToSelect,
    RoleSelect,
    Pagination,
    ShowXResults,
    ResetFilters,
    SortSelect,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule
  ],
  exports: [
    Loading,
    DisplaySelector,
    FromSelect,
    ToSelect,
    RoleSelect,
    Pagination,
    ShowXResults,
    ResetFilters,
    SortSelect
  ]
})
export class SharedModule { }
