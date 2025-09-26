import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing-module';
import { MovieComponent } from './movie';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../components/shared/shared-module';
import { MovieCast } from './movie-cast/movie-cast';
import { MovieCrew } from './movie-crew/movie-crew';
import { MovieFullCrew } from './movie-full-crew/movie-full-crew';
import { MovieOverview } from './movie-overview/movie-overview';
import { MovieHeader } from './movie-header/movie-header';
import { MovieSharedModule } from '../components/movie-shared/movie-shared-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieOverviewMainCast } from './movie-overview/movie-overview-main-cast/movie-overview-main-cast';


@NgModule({
  declarations: [
    MovieComponent,
    MovieCast,
    MovieCrew,
    MovieFullCrew,
    MovieOverview,
    MovieHeader,
    MovieOverviewMainCast,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
    MovieSharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FontAwesomeModule
  ]
})
export class MovieModule { }
