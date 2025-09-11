import { Component, Input, OnInit } from '@angular/core';
import { faUser, faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Person } from '../../classes/person';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-person-header',
  standalone: false,
  templateUrl: './person-header.html',
  styleUrl: './person-header.scss'
})
export class PersonHeader implements OnInit {

  public user: IconDefinition = faUser;
  public film: IconDefinition = faFilm;

  @Input() id: number = 0;
  @Input() person: Person = new Person();

  public name: string = '';
  public birthYear: number = 0;
  public deathYear: number = 0;
  public knownFor: string = '';
  public profileImg: string = '';

  public profileImgAltText: string = '';

  constructor() {}

  ngOnInit(): void {
    this.setName();
    this.setBirthYear();
    this.setDeathDay();
    this.setKnownFor();
    this.setProfileImg();
  }

  public setName(): void {
    if (this.person.name) {
      this.name = this.person.name;
    }
  }

  public setBirthYear(): void {
    if (this.person.birthday) {
      const birthDate: Date = new Date(this.person.birthday);
      this.birthYear = birthDate.getFullYear();
    }
  }

  public setDeathDay(): void {
    if (this.person.deathday) {
      const deathDate: Date = new Date(this.person.deathday);
      this.deathYear = deathDate.getFullYear();
    }
  }

  public setKnownFor(): void {
    if (this.person.known_for_department) {
      this.knownFor = this.person.known_for_department;
    }
  }

  public setProfileImg(): void {

    this.profileImg = this.person.profile_path ? `${environment.imgUrl}${environment.profileSizeSmall}${this.person.profile_path}` : 'img/default-images/profile_image_notavailable_w185.png'
    this.profileImgAltText = this.person.profile_path ? `Profile path for ${this.person.name}` : `Profile path for ${this.person.name} is not available`;
  }

}
