import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { PageResult } from '../interfaces/page-result';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private url: string;
  private apiKey: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.baseUrl;
    this.apiKey = environment.apiKey;
  }

  searchMovies(str: string): Observable<PageResult> {
    str = str.replace(/\s/, '%20');
    return this.http.get<PageResult>(`${this.url}/search/movie?api_key=${this.apiKey}&language=en-US&query=${str}`);
  }
}
