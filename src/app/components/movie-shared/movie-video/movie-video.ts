import { Component, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { ResponseVideoResult } from '../../../classes/response-video/response-video-result';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-movie-video',
  standalone: false,
  templateUrl: './movie-video.html',
  styleUrl: './movie-video.scss',
})
export class MovieVideo implements OnInit {

  public movieVideoUrl: WritableSignal<string> = signal('');

  public video: InputSignal<ResponseVideoResult> = input.required<ResponseVideoResult>();

  public officialBadge: WritableSignal<string> = signal('Official');

  ngOnInit(): void {
    this.setUrl();
  }

  private setUrl(): void {
    this.movieVideoUrl.set(`${environment.youtubeEmbedUrl}${this.video().key}`);
  }
}
