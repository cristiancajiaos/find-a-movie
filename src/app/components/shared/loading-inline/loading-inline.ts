import { Component, Input, OnInit } from '@angular/core';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-inline',
  standalone: false,
  templateUrl: './loading-inline.html',
  styleUrl: './loading-inline.scss'
})
export class LoadingInline implements OnInit {

  public spinner: IconDefinition = faSpinner;
  @Input() message: string = 'Loading...';
  
  ngOnInit(): void {

  }

}
