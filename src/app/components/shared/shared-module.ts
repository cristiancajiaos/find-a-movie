import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingFullscreen } from './loading-fullscreen/loading-fullscreen';
import { LoadingInline } from './loading-inline/loading-inline';

@NgModule({
  declarations: [
    LoadingFullscreen,
    LoadingInline
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingFullscreen,
    LoadingInline
  ]
})
export class SharedModule { }
