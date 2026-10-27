import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, WritableSignal, signal, InputSignal, input, OutputEmitterRef, output } from '@angular/core';
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

  public personErrorTitle: WritableSignal<string> = signal('Person Service Error');
  public personErrorText: WritableSignal<string> = signal('There was an error trying to get person info:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
