import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./modules/movie/movie-module').then((m) => m.MovieModule),
  },
  {
    path: 'person',
    loadChildren: () => import('./modules/person/person-module').then((m) => m.PersonModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search-module').then((m) => m.SearchModule),
  },
  { path: 'not-found', component: NotFound, pathMatch: 'full' },
  { path: '**', component: NotFound, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
