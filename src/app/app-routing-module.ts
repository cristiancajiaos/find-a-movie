import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './components/layout/main/main';
import { NotFound } from './components/not-found/not-found';

const routes: Routes = [
  { path: '', component: Main, pathMatch: 'full'},
  { path: 'movie', loadChildren: () => import('./movie/movie-module').then(m => m.MovieModule) },
  { path: 'person', loadChildren: () => import('./person/person-module').then(m => m.PersonModule) },
  { path: 'not-found', component: NotFound, pathMatch: 'full'},
  { path: 'search', loadChildren: () => import('./search/search-module').then(m => m.SearchModule) },
  { path: '**', component: NotFound, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
