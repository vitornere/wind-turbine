import { Component } from '@angular/core';

/**
 * Generated class for the SearchDataComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'search-data',
  templateUrl: 'search-data.html'
})
export class SearchDataComponent {

  text: string;

  constructor() {
    console.log('Hello SearchDataComponent Component');
    this.text = 'Hello World';
  }

}
