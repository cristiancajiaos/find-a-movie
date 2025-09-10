import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-error',
  standalone: false,
  templateUrl: './movie-error.html',
  styleUrl: './movie-error.scss'
})
export class MovieError implements OnInit {

  public repeat: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }

}
