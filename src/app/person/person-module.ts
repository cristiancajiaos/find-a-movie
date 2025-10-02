import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing-module';
import { PersonComponent } from './person';
import { SharedModule } from '../components/shared/shared-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonSharedModule } from '../components/person-shared/person-shared-module';
import { PersonHeader } from './person-header/person-header';
import { PersonOverview } from './person-overview/person-overview';
import { PersonMovieCredits } from './person-movie-credits/person-movie-credits';
import { RouterModule } from '@angular/router';
import { PersonMovieCreditsCast } from './person-movie-credits/person-movie-credits-cast/person-movie-credits-cast';
import { PersonMovieCreditsCrew } from './person-movie-credits/person-movie-credits-crew/person-movie-credits-crew';
import { NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonCastCredits } from './person-cast-credits/person-cast-credits';
import { PersonCrewCredits } from './person-crew-credits/person-crew-credits';

@NgModule({
  declarations: [
    PersonComponent,
    PersonHeader,
    PersonOverview,
    PersonMovieCredits,
    PersonMovieCreditsCast,
    PersonMovieCreditsCrew,
    PersonCastCredits,
    PersonCrewCredits
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
    NgbModule,
    FontAwesomeModule,
    PersonSharedModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }
