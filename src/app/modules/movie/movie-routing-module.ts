import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie';
import { MovieCast } from './movie-cast/movie-cast';
import { MovieCrew } from './movie-crew/movie-crew';
import { MovieFullCrew } from './movie-full-crew/movie-full-crew';
import { MovieOverview } from './movie-overview/movie-overview';
import { MovieSimilar } from './movie-similar/movie-similar';
import { MovieRecommendations } from './movie-recommendations/movie-recommendations';

const routes: Routes = [
  {
    path: ':id', component: MovieComponent,
    children: [
      {path: 'overview', component: MovieOverview, pathMatch: 'full'},
      {path: 'cast', component: MovieCast, pathMatch: 'full'},
      {path: 'crew', component: MovieCrew, pathMatch: 'full'},
      {path: 'full-crew', component: MovieFullCrew, pathMatch: 'full'},
      {path: 'recommendations', component: MovieRecommendations, pathMatch: 'full'},
      {path: 'similar', component: MovieSimilar, pathMatch: 'full'},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
