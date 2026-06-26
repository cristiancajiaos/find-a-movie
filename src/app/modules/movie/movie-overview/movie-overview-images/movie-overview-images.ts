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
export class MovieOverviewImages implements OnInit, OnChanges, OnDestroy {


  @Input() movieId: number = 0;

  private movieService = inject(MovieService);

  public movieImages: BackdropImage[] = [];

  private getBackdropImagesSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getImages();
  }

  private getImages(): void {
    this.getBackdropImagesSubscription = this.movieService.getMovieImages(this.movieId).subscribe({
      next: (images) => {
        this.setImages(images);
      },
      error: (error) => {},
      complete: () => {}
    });
  }

  private setImages(images: BackdropImage[]): void {
    if (images.length == 0) {
      return;
    }

    this.movieImages = [...images.slice(0,5).map((movieImage) => {
      movieImage.file_path = `${environment.imgUrl}${environment.backdropSize}${movieImage.file_path}`;
      return movieImage;
    })];
  }

  ngOnDestroy(): void {
    if (this.getBackdropImagesSubscription) {
      this.getBackdropImagesSubscription.unsubscribe();
    }
  }

}
