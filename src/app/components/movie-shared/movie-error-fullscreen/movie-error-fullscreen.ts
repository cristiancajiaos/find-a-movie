import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { faCircleXmark, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-error-fullscreen',
  standalone: false,
  templateUrl: './movie-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-error-fullscreen.scss'
})
export class MovieErrorFullscreen {

  public repeat: IconDefinition = faRepeat;
  public circleXIcon: IconDefinition = faCircleXmark;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
