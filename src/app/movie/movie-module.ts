import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing-module';
import { MovieComponent } from './movie';
import { Overview } from './overview/overview';
import { RouterOutlet } from '@angular/router';
import { FullCrew } from './full-crew/full-crew';
import { SharedModule } from '../components/shared/shared-module';
import { MovieCast } from './movie-cast/movie-cast';
import { MovieCrew } from './movie-crew/movie-crew';


@NgModule({
  declarations: [
    MovieComponent,
    Overview,
    MovieCast,
    FullCrew,
    MovieCrew,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class MovieModule { }
