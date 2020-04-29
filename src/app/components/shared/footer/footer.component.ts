import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.year = this.dateService.getCurrentYear();
  }

}
