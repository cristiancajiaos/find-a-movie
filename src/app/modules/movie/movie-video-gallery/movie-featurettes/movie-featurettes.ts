import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-featurettes',
  standalone: false,
  templateUrl: './movie-featurettes.html',
  styleUrl: './movie-featurettes.scss',
})
export class MovieFeaturettes implements OnChanges {

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public movieFeaturettes: WritableSignal<ResponseVideoResult[]> = signal([]);

  public movieFeaturettesTitle: WritableSignal<string> = signal('Featurettes');

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieFeaturettes();
  }

  private setMovieFeaturettes(): void {
    this.movieFeaturettes.set(this.movieVideos().filter(video => {
      return video.type == 'Featurette'
    }));
  }

}
