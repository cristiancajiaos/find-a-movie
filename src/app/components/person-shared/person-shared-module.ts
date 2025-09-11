import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonError } from './person-error/person-error';
import { PersonErrorFullscreen } from './person-error-fullscreen/person-error-fullscreen';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonNotFound } from './person-not-found/person-not-found';

@NgModule({
  declarations: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound
  ]
})
export class PersonSharedModule { }
