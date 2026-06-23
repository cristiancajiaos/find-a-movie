import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-error-fullscreen',
  standalone: false,
  templateUrl: './person-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-error-fullscreen.scss'
})
export class PersonErrorFullscreen implements OnInit {

  public bgImage: string = 'img/bg/bg_generic_2.jpg';
  public repeat: IconDefinition = faRepeat;

  @Input() errorMessage: string = '';
  @Output() reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

  public pressReload(): void {
    this.reload.emit(true);
  }

}
