import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFound } from './not-found';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NotFound
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class NotFoundModule { }
