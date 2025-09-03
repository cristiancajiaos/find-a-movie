import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Movie } from './movie';

const routes: Routes = [{ path: '', component: Movie }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
