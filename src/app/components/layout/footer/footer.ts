import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.scss'
})
export class Footer implements OnInit {

  public creationYear: WritableSignal<number> = signal(0);
  public currentYear: WritableSignal<number> = signal(0);

  public authorText: WritableSignal<string> = signal('Cristian Cajiao Skarnic, ');

  public usesAPIOne: WritableSignal<string> = signal('Uses the');
  public usesAPITwo: WritableSignal<string> = signal('API');

  public appVersionText: WritableSignal<string> = signal('App version: ');
  public appVersion: WritableSignal<string> = signal(environment.appVersion);

  ngOnInit(): void {
    const creationDate: Date = new Date (2025, 9, 3);
    const currentDate = new Date();

    this.creationYear.set(creationDate.getFullYear());
    this.currentYear.set(currentDate.getFullYear());
  }

}
