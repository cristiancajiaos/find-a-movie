import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout-module';
import { authInterceptor } from './interceptors/auth-interceptor';
import { RuntimePipe } from './pipes/runtime-pipe';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
  bootstrap: [App]
})
export class AppModule { }
