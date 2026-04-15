import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingFullscreen } from './loading-fullscreen/loading-fullscreen';
import { LoadingInline } from './loading-inline/loading-inline';
import { DisplaySelector } from './display-selector/display-selector';
import { OrderSelect } from './order-select/order-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FromSelect } from './from-select/from-select';
import { ToSelect } from './to-select/to-select';
import { RoleSelect } from './role-select/role-select';

@NgModule({
  declarations: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector,
    OrderSelect,
    FromSelect,
    ToSelect,
    RoleSelect
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ],
  exports: [
    LoadingFullscreen,
    LoadingInline,
    DisplaySelector,
    OrderSelect,
    FromSelect,
    ToSelect,
    RoleSelect
  ]
})
export class SharedModule { }
