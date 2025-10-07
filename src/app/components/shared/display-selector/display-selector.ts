import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-display-selector',
  standalone: false,
  templateUrl: './display-selector.html',
  styleUrl: './display-selector.scss'
})
export class DisplaySelector implements OnInit {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;

  @Input() displayMode: string = 'grid';
  @Output() onDisplayChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

  }

  public toggleDisplay(display: string) {
    this.displayMode = display;
    this.onDisplayChange.emit(display);
  }


}
