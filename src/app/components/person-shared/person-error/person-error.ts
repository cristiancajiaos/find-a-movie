import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-error',
  standalone: false,
  templateUrl: './person-error.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-error.scss'
})
export class PersonError {

  public repeat: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
