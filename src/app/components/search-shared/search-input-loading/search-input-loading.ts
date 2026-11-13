import { Component, signal, WritableSignal } from '@angular/core';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-input-loading',
  standalone: false,
  templateUrl: './search-input-loading.html',
  styleUrl: './search-input-loading.scss',
})
export class SearchInputLoading {

  public spinnerIcon: IconDefinition = faSpinner;

  public loadingText: WritableSignal<string> = signal('Loading...');

}
