import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout-module';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        loadingInterceptor
      ])),
  ],
  bootstrap: [App]
})
export class AppModule { }
