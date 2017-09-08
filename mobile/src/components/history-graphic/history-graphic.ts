import { Component } from '@angular/core';

/**
 * Generated class for the HistoryGraphicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'history-graphic',
  templateUrl: 'history-graphic.html'
})
export class HistoryGraphicComponent {

  text: string;

  constructor() {
    console.log('Hello HistoryGraphicComponent Component');
    this.text = 'Hello World';
  }

}
