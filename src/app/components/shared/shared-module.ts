import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingFullscreen } from './loading-fullscreen/loading-fullscreen';
import { LoadingInline } from './loading-inline/loading-inline';
import { DisplaySelector } from './display-selector/display-selector';

@NgModule({
  declarations: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector
  ]
})
export class SharedModule { }
