import { Component, Input } from '@angular/core';

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

  @Input()
  id: number;
  @Input()  
  titulo: string;
  @Input()  
  imageSrc: string;

  periodos = [
    'diario',
    'semanal',
    'mensal',
    'anual'
  ]

  constructor() {
    console.log("Esta no history grafic");
  }

}
