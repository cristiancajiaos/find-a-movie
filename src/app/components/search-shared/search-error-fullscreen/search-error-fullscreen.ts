import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-error-fullscreen',
  standalone: false,
  templateUrl: './search-error-fullscreen.html',
  styleUrl: './search-error-fullscreen.scss'
})
export class SearchErrorFullscreen implements OnInit {

  public repeatIcon: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }

}
