import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { SearchSharedModule } from '../search-shared/search-shared-module';
import { PipesModule } from '../../pipes/pipes-module';
import { ToggleDarkMode } from './navbar/toggle-dark-mode/toggle-dark-mode';
import { SelectInputSearch } from './navbar/select-input-search/select-input-search';

@NgModule({
  declarations: [
    Layout,
    Navbar,
    Footer,
    ToggleDarkMode,
    SelectInputSearch
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule,
    SearchSharedModule,
    PipesModule
  ],
  exports: [
    Layout,
    Navbar,
    Footer,
  ]
})
export class LayoutModule { }
