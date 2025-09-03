import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Movie } from './movie';
import { Overview } from './overview/overview';
import { Cast } from './cast/cast';
import { Crew } from './crew/crew';
import { FullCrew } from './full-crew/full-crew';

const routes: Routes = [
  {
    path: ':id', component: Movie,
    children: [
      {path: '', component: Overview},
      {path: 'cast', component: Cast},
      {path: 'crew', component: Crew},
      {path: 'full-crew', component: FullCrew }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
