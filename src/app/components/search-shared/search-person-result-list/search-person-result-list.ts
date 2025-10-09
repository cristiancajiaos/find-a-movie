import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonResult } from '../../../classes/response-search-person/response-person-result';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-search-person-result-list',
  standalone: false,
  templateUrl: './search-person-result-list.html',
  styleUrl: './search-person-result-list.scss',
})
export class SearchPersonResultList implements OnInit {
  public profileImg: string = '';

  @Input() personResult: ResponsePersonResult = new ResponsePersonResult();

  ngOnInit(): void {
    this.setProfileImg();
  }

  public setProfileImg(): void {
    this.profileImg = this.personResult.profile_path
      ? `${environment.imgUrl}${environment.profileSizeSmall}${this.personResult.profile_path}`
      : 'img/default-images/profile_image_notavailable_w500.png';
  }
}
