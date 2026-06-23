import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-inline',
  standalone: false,
  templateUrl: './loading-inline.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loading-inline.scss'
})
export class LoadingInline implements OnInit {

  public spinner: IconDefinition = faSpinner;
  @Input() message: string = 'Loading...';
  
  ngOnInit(): void {

  }

}
