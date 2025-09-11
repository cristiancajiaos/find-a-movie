import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person';
import { PersonOverview } from './person-overview/person-overview';
import { PersonMovieCredits } from './person-movie-credits/person-movie-credits';

const routes: Routes = [
  { path: ':id',
    component: PersonComponent,
    children: [
      {path: 'overview', component: PersonOverview, pathMatch: 'full'},
      {path: 'movie-credits', component: PersonMovieCredits, pathMatch: 'full'},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
