import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './views/home/home.component';
import { SearchViewComponent } from './views/search/search.component';
import { MovieComponent } from './views/movie/movie.component';
import { MaterialModule } from '../modules/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFormComponent } from './shared/search/search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';
import { SearchResultComponent } from './shared/search-result/search-result.component';
import { CdkModule } from '../modules/cdk/cdk.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    SearchViewComponent,
    MovieComponent,
    SearchFormComponent,
    FooterComponent,
    LoadingComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CdkModule
  ]
})
export class ComponentsModule { }
