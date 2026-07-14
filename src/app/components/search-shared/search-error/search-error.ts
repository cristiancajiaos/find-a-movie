import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-error',
  standalone: false,
  templateUrl: './search-error.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-error.scss'
})
export class SearchError {

  public repeatIcon: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }

}
