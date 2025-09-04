import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loading } from './loading/loading';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    Loading
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    Loading
  ]
})
export class SharedModule { }
