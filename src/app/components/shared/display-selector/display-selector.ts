import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-display-selector',
  standalone: false,
  templateUrl: './display-selector.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './display-selector.scss'
})
export class DisplaySelector {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;

  public displayMode = input.required();
  public onDisplayChange = output<string>();

  public toggleDisplay(display: string) {
    this.onDisplayChange.emit(display);
  }


}
