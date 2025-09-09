import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing-module';
import { PersonComponent } from './person';


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
