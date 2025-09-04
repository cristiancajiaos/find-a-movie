import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing-module';
import { MovieComponent } from './movie';
import { Overview } from './overview/overview';
import { Crew } from './crew/crew';
import { RouterOutlet } from '@angular/router';
import { FullCrew } from './full-crew/full-crew';
import { SharedModule } from '../components/shared/shared-module';
import { MovieCast } from './movie-cast/movie-cast';


@NgModule({
  declarations: [
    MovieComponent,
    Overview,
    MovieCast,
    Crew,
    FullCrew,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class MovieModule { }
