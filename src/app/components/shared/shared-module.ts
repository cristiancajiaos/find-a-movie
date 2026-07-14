import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisplaySelector } from './display-selector/display-selector';
import { OrderSelect } from './order-select/order-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FromSelect } from './from-select/from-select';
import { ToSelect } from './to-select/to-select';
import { RoleSelect } from './role-select/role-select';
import { Loading } from './loading/loading';

@NgModule({
  declarations: [
    Loading,
    DisplaySelector,
    OrderSelect,
    FromSelect,
    ToSelect,
    RoleSelect,
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
    Loading,
    DisplaySelector,
    OrderSelect,
    FromSelect,
    ToSelect,
    RoleSelect
  ]
})
export class SharedModule { }
