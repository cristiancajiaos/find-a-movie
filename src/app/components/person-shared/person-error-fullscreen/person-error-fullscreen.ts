import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-error-fullscreen',
  standalone: false,
  templateUrl: './person-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-error-fullscreen.scss'
})
export class PersonErrorFullscreen {

  public repeat: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
