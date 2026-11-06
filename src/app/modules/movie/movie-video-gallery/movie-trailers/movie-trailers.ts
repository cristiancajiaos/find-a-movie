import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-trailers',
  standalone: false,
  templateUrl: './movie-trailers.html',
  styleUrl: './movie-trailers.scss',
})
export class MovieTrailers implements OnChanges {

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public movieTrailers: WritableSignal<ResponseVideoResult[]> = signal([]);

  public movieTrailersTitle: WritableSignal<string> = signal('Trailers');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieTrailers();
  }

  private setMovieTrailers(): void {
    this.movieTrailers.set(this.movieVideos().filter(video => {
      return video.type == 'Trailer'
    }));
  }

}
