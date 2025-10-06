import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Search } from './search';
import { SearchMovie } from './search-movie/search-movie';
import { SearchPerson } from './search-person/search-person';
import { SearchMain } from './search-main/search-main';

const routes: Routes = [
  { path: '',
    component: Search,
    children: [
      {path: 'movie/:searchQuery', component: SearchMovie, pathMatch: 'full'},
      {path: 'person/:searchQuery', component: SearchPerson, pathMatch: 'full'},
      {path: 'main', component: SearchMain, pathMatch: 'full'},
      {path: 'movie', redirectTo: '/search/main', pathMatch: 'full'},
      {path: 'person', redirectTo: '/search/main', pathMatch: 'full'},
      {path: '**', redirectTo: '/search/main', pathMatch: 'full'}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
