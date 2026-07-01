import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MovieService } from '../../../../services/movie-service';
import { BackdropImage } from '../../../../classes/response-image/backdrop-image';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-movie-overview-images',
  standalone: false,
  templateUrl: './movie-overview-images.html',
  styleUrl: './movie-overview-images.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class MovieOverviewImages implements OnChanges {

  @Input() movieImages: BackdropImage[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.setImages();
  }

  private setImages(): void {
    if (this.movieImages.length == 0) {
      return;
    }

    this.movieImages = [...this.movieImages.slice(0,10).map((movieImage) => {
      movieImage.file_path = `${environment.imgUrl}${environment.backdropSize}${movieImage.file_path}`;
      return movieImage;
    })];
  }

}
