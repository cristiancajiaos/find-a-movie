import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { ResponsePersonResult } from '../../../../../classes/response-search-person/response-person-result';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-search-input-person-result',
  standalone: false,
  templateUrl: './search-input-person-result.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-input-person-result.scss',
})
export class SearchInputPersonResult implements OnInit {
  public profileImg: string = '';

  @Input() personResult: ResponsePersonResult;
  @Output() clickResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.setProfileImg();
  }

  public setProfileImg(): void {
    this.profileImg = this.personResult.profile_path
      ? `${environment.imgUrl}${environment.profileSizeSmall}${this.personResult.profile_path}`
      : 'img/default-images/profile_image_notavailable_w500.jpg';
  }

  public onClickResult(): void {
    this.clickResult.emit(true);
  }
}
