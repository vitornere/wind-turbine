import { Component, Input } from '@angular/core';

/**
 * Generated class for the HistoryGraphicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'base-graphic',
  templateUrl: 'base-graphic.component.html'
})
export class BaseGraphicComponent {

  @Input()
  id: number;
  @Input()  
  titulo: string;
  @Input()  
  imageSrc: string;

  constructor() {
    console.log("Esta no history grafic");
  }

}
