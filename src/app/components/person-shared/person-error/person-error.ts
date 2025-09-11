import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-error',
  standalone: false,
  templateUrl: './person-error.html',
  styleUrl: './person-error.scss'
})
export class PersonError implements OnInit {

  public repeat: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }
}
