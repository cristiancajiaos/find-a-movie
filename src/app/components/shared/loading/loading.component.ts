import { Component, OnInit, Input } from '@angular/core';
import { faSpinner, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
  faSpinner: IconDefinition;
  @Input() whatToLoad: string;

  constructor() {
    this.faSpinner = faSpinner;
  }

  ngOnInit() {}
}
