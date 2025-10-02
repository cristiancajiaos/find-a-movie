import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person';
import { PersonOverview } from './person-overview/person-overview';
import { PersonCastCredits } from './person-cast-credits/person-cast-credits';
import { PersonCrewCredits } from './person-crew-credits/person-crew-credits';

const routes: Routes = [
  { path: ':id',
    component: PersonComponent,
    children: [
      {path: 'overview', component: PersonOverview, pathMatch: 'full'},
      {path: 'cast-credits', component: PersonCastCredits, pathMatch: 'full'},
      {path: 'crew-credits', component: PersonCrewCredits, pathMatch: 'full'},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
