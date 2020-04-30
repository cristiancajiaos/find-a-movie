import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MovieComponent } from './views/movie/movie.component';
import { SearchViewComponent } from './views/search/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'search', component: SearchViewComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
