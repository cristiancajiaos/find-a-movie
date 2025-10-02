import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonError } from './person-error/person-error';
import { PersonErrorFullscreen } from './person-error-fullscreen/person-error-fullscreen';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonNotFound } from './person-not-found/person-not-found';
import { PersonCrewCredit } from './person-crew-credit/person-crew-credit';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonCastCreditGrid } from './person-cast-credit-grid/person-cast-credit-grid';
import { PersonCastCreditList } from './person-cast-credit-list/person-cast-credit-list';
import { PersonCrewCreditGrid } from './person-crew-credit-grid/person-crew-credit-grid';
import { PersonCrewCreditList } from './person-crew-credit-list/person-crew-credit-list';

@NgModule({
  declarations: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound,
    PersonCrewCredit,
    PersonCastCreditGrid,
    PersonCastCreditList,
    PersonCrewCreditGrid,
    PersonCrewCreditList
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    PersonError,
    PersonErrorFullscreen,
    PersonNotFound,
    PersonCrewCredit,
    PersonCastCreditGrid,
    PersonCastCreditList,
    PersonCrewCreditGrid,
    PersonCrewCreditList
  ]
})
export class PersonSharedModule { }
