import { Component, Input, OnInit } from '@angular/core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-fullscreen',
  standalone: false,
  templateUrl: './loading-fullscreen.html',
  styleUrl: './loading-fullscreen.scss'
})
export class LoadingFullscreen implements OnInit {

  public spinnerIcon: IconDefinition = faSpinner;

  public bgImage: string = 'img/bg/loading-bg.jpg';

  @Input() message: string = 'Loading...';

  ngOnInit(): void {

  }

}
