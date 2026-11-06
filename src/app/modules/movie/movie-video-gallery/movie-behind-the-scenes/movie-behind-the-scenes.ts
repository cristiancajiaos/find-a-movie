import { Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../../classes/response-video/response-video-result';

@Component({
  selector: 'app-movie-behind-the-scenes',
  standalone: false,
  templateUrl: './movie-behind-the-scenes.html',
  styleUrl: './movie-behind-the-scenes.scss',
})
export class MovieBehindTheScenes implements OnChanges {

  public movieVideos: InputSignal<ResponseVideoResult[]> = input.required<ResponseVideoResult[]>();

  public movieBehindTheScenesVideos: WritableSignal<ResponseVideoResult[]> = signal([]);

  public movieBehindTheScenesTitle: WritableSignal<string> = signal('Behind The Scenes Videos');

  ngOnChanges(changes: SimpleChanges): void {
    this.setBehindTheScenes();
  }

  private setBehindTheScenes(): void {
    this.movieBehindTheScenesVideos.set(this.movieVideos().filter(video => {
      return video.type == 'Behind the Scenes'
    }));
  }

}
