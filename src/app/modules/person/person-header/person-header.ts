import { Component, Input, OnChanges, ChangeDetectionStrategy, input, InputSignal } from '@angular/core';
import { faUser, faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Person } from '../../../classes/person';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-person-header',
  standalone: false,
  templateUrl: './person-header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-header.scss'
})
export class PersonHeader implements OnChanges {

  public userIcon: IconDefinition = faUser;
  public filmIcon: IconDefinition = faFilm;

  public bgImage: string = 'img/default-images/bg_person_header.jpg';

  public name: string = '';
  public birthYear: number = 0;
  public deathYear: number = 0;
  public knownFor: string = '';
  public profileImg: string = '';

  public profileImgAltText: string = '';

  id: InputSignal<number> = input.required<number>();
  person: InputSignal<Person> = input.required<Person>();

  ngOnChanges() {
    this.setProfileImg();
  }

  public setProfileImg(): void {
    this.profileImg = this.person().profile_path ? `${environment.imgUrl}${environment.profileSizeSmall}${this.person().profile_path}` : 'img/default-images/profile_image_notavailable_w185.jpg'
    this.profileImgAltText = this.person().profile_path ? `Profile path for ${this.person.name}` : `Profile path for ${this.person().name} is not available`;
  }

}
