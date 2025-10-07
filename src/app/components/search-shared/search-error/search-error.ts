import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-error',
  standalone: false,
  templateUrl: './search-error.html',
  styleUrl: './search-error.scss'
})
export class SearchError implements OnInit {

  public repeatIcon: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }

}
