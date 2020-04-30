import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl: string;
  private backdropSize: string;
  private noBackdropUrl: string;

  constructor() {
    this.baseUrl = environment.imageBaseUrl;
    this.backdropSize = environment.backdropSize;
    this.noBackdropUrl = environment.noBackdropUrl;
  }

  buildBackdropImage(str): string {
    if (str) {

    }
    return str ? `${this.baseUrl}${this.backdropSize}${str}` : this.noBackdropUrl;
  }
}
