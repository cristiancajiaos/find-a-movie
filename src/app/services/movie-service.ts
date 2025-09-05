import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) {}

  public async getMovie(id: number): Promise<Movie> {
    return await lastValueFrom(this.http.get<Movie>(`/movie/${id}`));
  }
}
