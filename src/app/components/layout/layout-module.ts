import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout';
import { Navbar } from './navbar/navbar';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    Layout,
    Navbar,
    Main,
    Footer
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    Layout,
    Navbar,
    Main,
    Footer
  ]
})
export class LayoutModule { }
