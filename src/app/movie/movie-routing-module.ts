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
      {path: 'overview', component: Overview, pathMatch: 'full'},
      {path: 'cast', component: Cast, pathMatch: 'full'},
      {path: 'crew', component: Crew, pathMatch: 'full'},
      {path: 'full-crew', component: FullCrew, pathMatch: 'full'},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
