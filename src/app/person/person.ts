import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../services/title-service';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  styleUrl: './person.scss'
})
export class PersonComponent implements OnInit, AfterContentInit {

  public id: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cd.detectChanges();
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.setTitle();
  }

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  private setTitle(): void {
    this.titleService.setTitle(`Person with ID ${this.id}`)
  }

}
