import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing-module';
import { PersonComponent } from './person';
import { SharedModule } from '../components/shared/shared-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonSharedModule } from '../components/person-shared/person-shared-module';


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
    NgbModule,
    FontAwesomeModule,
    PersonSharedModule
  ]
})
export class PersonModule { }
