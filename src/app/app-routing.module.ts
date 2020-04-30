import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { MovieComponent } from './components/views/movie/movie.component';
import { SearchViewComponent } from './components/views/search/search.component';
import { LayoutComponent } from './components/shared/layout/layout.component';


const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: './components/components.module#ComponentsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
