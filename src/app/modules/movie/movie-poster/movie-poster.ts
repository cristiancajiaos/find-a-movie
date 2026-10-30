import {
  Component,
  input,
  InputSignal,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { IconDefinition, faImagePortrait } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../classes/movie';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-movie-poster',
  standalone: false,
  templateUrl: './movie-poster.html',
  styleUrl: './movie-poster.scss',
})
export class MoviePoster implements OnChanges {
  public imagePortrait: IconDefinition = faImagePortrait;

  public altPosterText: WritableSignal<string> = signal('');
  public posterSizeSmall: WritableSignal<string> = signal('');
  public posterSizeOriginal: WritableSignal<string> = signal('');

  public openPosterText: WritableSignal<string> = signal('Open Poster in New Tab');

  movie: InputSignal<Movie> = input.required<Movie>();
  formattedTitle: InputSignal<string> = input.required<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setPoster();
  }

  private setPoster(): void {
    this.posterSizeSmall.set(
      this.movie().poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movie().poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.jpg',
    );
    this.posterSizeOriginal.set(
      this.movie().poster_path
        ? `${environment.imgUrl}${environment.posterSizeOriginal}${this.movie().poster_path}`
        : '',
    );
    this.altPosterText.set(
      this.movie().poster_path
        ? `Poster from the movie ${this.formattedTitle()}`
        : `Poster from the movie ${this.formattedTitle()} is not available`,
    );
  }
}
