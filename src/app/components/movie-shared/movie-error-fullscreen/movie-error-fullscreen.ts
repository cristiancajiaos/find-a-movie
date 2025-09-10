import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-error-fullscreen',
  standalone: false,
  templateUrl: './movie-error-fullscreen.html',
  styleUrl: './movie-error-fullscreen.scss'
})
export class MovieErrorFullscreen implements OnInit {

  public repeat: IconDefinition = faRepeat;
  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }

}
