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

  turbine_datas: [{}];

  constructor() {
    this.turbine_datas =
      [
        {
          'image_src': 'assets/img/wind.jpg',
          'title': 'Velocidade do Vento',
          'subtitle': 4
        },
        {
          'image_src': 'assets/img/voltagem.jpg',
          'title': 'Voltagem da turbina',
          'subtitle': Math.floor(Math.random() * 220)          
        },
        {
          'image_src': 'assets/img/tensao.jpg',
          'title': 'Tensao',
          'subtitle': 10
        },
        {
          'image_src': 'assets/img/MPPT.png',
          'title': 'MPPT',
          'subtitle': 10
        },
      ]
  }
  clickMessage = 'Teste';

  onClickMe() {
    this.clickMessage += 'You are my hero!';
    console.log('clickMessage');
  }
}
