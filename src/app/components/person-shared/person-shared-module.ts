import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonError } from './person-error/person-error';
import { PersonErrorFullscreen } from './person-error-fullscreen/person-error-fullscreen';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonNotFound } from './person-not-found/person-not-found';
import { PersonCastCredit } from './person-cast-credit/person-cast-credit';
import { PersonCrewCredit } from './person-crew-credit/person-crew-credit';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound,
    PersonCastCredit,
    PersonCrewCredit
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound,
    PersonCastCredit,
    PersonCrewCredit
  ]
})
export class PersonSharedModule { }
