import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie';
import { Overview } from './overview/overview';
import { FullCrew } from './full-crew/full-crew';
import { MovieCast } from './movie-cast/movie-cast';
import { MovieCrew } from './movie-crew/movie-crew';

const routes: Routes = [
  {
    path: ':id', component: MovieComponent,
    children: [
      {path: 'overview', component: Overview, pathMatch: 'full'},
      {path: 'cast', component: MovieCast, pathMatch: 'full'},
      {path: 'crew', component: MovieCrew, pathMatch: 'full'},
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
