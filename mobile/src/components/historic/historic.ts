import { Component } from '@angular/core';

/**
 * Generated class for the HistoricComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'historic',
  templateUrl: 'historic.html'
})
export class HistoricComponent {

  text: string;

  constructor() {
    console.log('Hello HistoricComponent Component');
    this.text = 'Hello World';
  }

}
