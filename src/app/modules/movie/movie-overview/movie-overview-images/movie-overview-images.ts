import { Component, ChangeDetectionStrategy, input, InputSignal, WritableSignal, signal } from '@angular/core';
import { BackdropImage } from '../../../../classes/response-image/backdrop-image';

@Component({
  selector: 'app-movie-overview-images',
  standalone: false,
  templateUrl: './movie-overview-images.html',
  styleUrl: './movie-overview-images.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class MovieOverviewImages {

  public movieImages: InputSignal<BackdropImage[]> = input.required<BackdropImage[]>();

  public imagesGalleryTitle: WritableSignal<string> = signal('Images Gallery');

}
