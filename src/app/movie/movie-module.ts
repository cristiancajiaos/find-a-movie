import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing-module';
import { MovieComponent } from './movie';
import { Overview } from './overview/overview';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../components/shared/shared-module';
import { MovieCast } from './movie-cast/movie-cast';
import { MovieCrew } from './movie-crew/movie-crew';
import { MovieFullCrew } from './movie-full-crew/movie-full-crew';


@NgModule({
  declarations: [
    MovieComponent,
    Overview,
    MovieCast,
    MovieCrew,
    MovieFullCrew,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class MovieModule { }
