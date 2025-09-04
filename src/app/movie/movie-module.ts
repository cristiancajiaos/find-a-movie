import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing-module';
import { MovieComponent } from './movie';
import { Overview } from './overview/overview';
import { Cast } from './cast/cast';
import { Crew } from './crew/crew';
import { RouterOutlet } from '@angular/router';
import { FullCrew } from './full-crew/full-crew';
import { SharedModule } from '../components/shared/shared-module';


@NgModule({
  declarations: [
    MovieComponent,
    Overview,
    Cast,
    Crew,
    FullCrew
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class MovieModule { }
