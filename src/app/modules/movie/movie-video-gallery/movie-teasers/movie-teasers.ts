import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-teasers',
  standalone: false,
  templateUrl: './movie-teasers.html',
  styleUrl: './movie-teasers.scss',
})
export class MovieTeasers implements OnChanges {

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public movieTeasers: WritableSignal<ResponseVideoResult[]> = signal([]);

  public movieTeasersTitle: WritableSignal<string> = signal('Teasers');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieTeasers();
  }

  private setMovieTeasers(): void {
    this.movieTeasers.set(this.movieVideos().filter(video => {
      return video.type == 'Teaser'
    }));

  }

}
