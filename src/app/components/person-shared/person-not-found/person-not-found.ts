import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-person-not-found',
  standalone: false,
  templateUrl: './person-not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-not-found.scss'
})
export class PersonNotFound {
  public bgImage: string = 'img/bg/bg_generic_2.jpg';
}
