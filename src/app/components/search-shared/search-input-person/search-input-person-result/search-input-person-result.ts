import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal, InputSignal, input, OutputEmitterRef, output } from '@angular/core';
import { ResponsePersonResult } from '../../../../classes/response-search-person/response-person-result';
import { environment } from '../../../../../environments/environment.development';


@Component({
  selector: 'app-search-input-person-result',
  standalone: false,
  templateUrl: './search-input-person-result.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-input-person-result.scss',
})
export class SearchInputPersonResult implements OnInit {
  public bgImage: WritableSignal<Object> = signal({});

  personResult: InputSignal<ResponsePersonResult> = input.required<ResponsePersonResult>();
  clickResult: OutputEmitterRef<boolean> = output<boolean>();

  ngOnInit(): void {
    this.setProfileImg();
  }

  private setProfileImg(): void {
    const profileImg = this.personResult().profile_path
      ? `${environment.imgUrl}${environment.profileSizeSmall}${this.personResult().profile_path}`
      : 'img/default-images/profile_image_notavailable_w500.jpg';
    this.bgImage.set({
      'background-image':`url(${profileImg})`
    });
  }
  public onClickResult(): void {
    this.clickResult.emit(true);
  }
}
