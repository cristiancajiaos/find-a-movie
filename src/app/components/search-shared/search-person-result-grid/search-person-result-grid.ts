import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal, InputSignal, input } from '@angular/core';
import { ResponsePersonResult } from '../../../classes/response-search-person/response-person-result';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-search-person-result-grid',
  standalone: false,
  templateUrl: './search-person-result-grid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-person-result-grid.scss',
})
export class SearchPersonResultGrid implements OnInit {
  public profileImg: WritableSignal<string> = signal('');
  public profileImgAlt: WritableSignal<string> = signal('');

  personResult: InputSignal<ResponsePersonResult> = input.required<ResponsePersonResult>();

  ngOnInit(): void {
    this.setProfileImg();
  }

  public setProfileImg(): void {
    this.profileImg.set(this.personResult().profile_path
      ? `${environment.imgUrl}${environment.profileSizeSmall}${this.personResult().profile_path}`
      : 'img/default-images/profile_image_notavailable_w500.jpg');
    this.profileImgAlt.set(this.personResult().profile_path ? `Profile image for ${this.personResult().name}` : 'Profile image is not available');
  }
}
