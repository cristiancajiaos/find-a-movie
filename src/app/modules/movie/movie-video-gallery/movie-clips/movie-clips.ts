import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-clips',
  standalone: false,
  templateUrl: './movie-clips.html',
  styleUrl: './movie-clips.scss',
})
export class MovieClips implements OnChanges {

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public movieClipVideos: WritableSignal<ResponseVideoResult[]> = signal([]);

  public movieClipsTitle: WritableSignal<string> = signal('Clips from the movie');

  ngOnChanges(changes: SimpleChanges): void {
    this.setClips();
  }

  private setClips(): void {
    this.movieClipVideos.set(this.movieVideos().filter(video => {
      return video.type == 'Clip';
    }));
  }


}
