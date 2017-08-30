import { Component } from '@angular/core';

/**
 * Generated class for the TurbineDataComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'turbine-data',
  templateUrl: 'turbine-data.html'
})
export class TurbineDataComponent {

  image_src: string = 'assets/img/';
  title: string = '';
  subtitle: number = 0;

  constructor() {
    this.image_src += 'wind.jpg';
    this.title = 'Velocidade do Vento';
    this.subtitle = 4;
  }

}
