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


@NgModule({
  declarations: [
    MovieComponent,
    MovieCast,
    MovieCrew,
    MovieFullCrew,
    MovieOverview,
    MovieHeader,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class MovieModule { }
