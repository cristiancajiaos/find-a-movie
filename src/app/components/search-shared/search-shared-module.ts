import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchError } from './search-error/search-error';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchErrorFullscreen } from './search-error-fullscreen/search-error-fullscreen';

@NgModule({
  declarations: [
    SearchError,
    SearchErrorFullscreen
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    SearchError,
    SearchErrorFullscreen
  ]
})
export class SearchSharedModule { }
