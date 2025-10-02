import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingFullscreen } from './loading-fullscreen/loading-fullscreen';
import { LoadingInline } from './loading-inline/loading-inline';
import { DisplaySelector } from './display-selector/display-selector';
import { OrderSelect } from './order-select/order-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector,
    OrderSelect
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector,
    OrderSelect
  ]
})
export class SharedModule { }
