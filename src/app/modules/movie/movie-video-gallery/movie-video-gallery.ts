import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie-service';
import { SessionStorageService } from '../../../services/session-storage-service';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { Movie } from '../../../classes/movie';
import { Subscription } from 'rxjs';
import { formattedMovieTitle } from '../../../helpers/movie-helper';

@Component({
  selector: 'app-movie-video-gallery',
  standalone: false,
  templateUrl: './movie-video-gallery.html',
  styleUrl: './movie-video-gallery.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class MovieVideoGallery implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: WritableSignal<number> = signal(0);

  public movie: WritableSignal<Movie> = signal(null);

  public movieVideoGalleryError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  public movieVideoGalleryTitle: WritableSignal<string> = signal('Movie Video Gallery');

  public movieVideoGalleryText = computed(() => {
    return `These are the videos available for ${this.movie().title}: `;
  });

  public movieTrailersTitle: WritableSignal<string> = signal('Trailers');
  public movieTeasersTitle: WritableSignal<string> = signal('Teasers');
  public movieFeaturettesTitle: WritableSignal<string> = signal('Featurettes');
  public movieBethindTheScenesTitle: WritableSignal<string> = signal('Bethind The Scenes Videos');

  private activatedRouteParentSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.setId();
    this.getMovie();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent.params?.subscribe(
      (params) => {
        this.id.set(parseInt(params['id']
        ))
      }
    );
  }

  private getMovie(): void {
    this.movie.set(this.sessionStorageService.getItem('movie'));
    this.setTitle();
  }

  private getVideoGallery(): void {

  }

  private setTitle(): void {
    const formattedTitle: string = formattedMovieTitle(
      this.movie().title,
      this.movie().original_title,
      this.movie().release_date
    );
    this.titleService.setMovieVideoGalleryTitle(formattedTitle);
  }

  public reloadVideoGallery(event: boolean): void {
    this.getVideoGallery();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
  }
}
