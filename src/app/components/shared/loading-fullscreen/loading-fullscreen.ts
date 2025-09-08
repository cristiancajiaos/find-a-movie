import { Component, Input, OnInit } from '@angular/core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-fullscreen',
  standalone: false,
  templateUrl: './loading-fullscreen.html',
  styleUrl: './loading-fullscreen.scss'
})
export class LoadingFullscreen implements OnInit {
  
  public spinner: IconDefinition = faSpinner;
  @Input() message: string = 'Loading...';

  ngOnInit(): void {

  }

}
