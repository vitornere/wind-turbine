import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GraphicPage } from './../../pages/graphic/graphic';

@Component({
  selector: 'turbine-data',
  templateUrl: 'turbine-data.html'
})
export class TurbineDataComponent implements OnDestroy {

  turbine_datas: [{}];
  updateData: any;
  clickMessage = 'Teste';

  constructor(public navCtrl: NavController) {
    this.turbine_datas =
      [
        {
          'id': 0,
          'image_src': 'assets/img/wind.png',
          'title': 'Velocidade do Vento',
          'subtitle': 4,
          'unity': ' m/s'
        },
        {
          'id': 1,
          'image_src': 'assets/img/volt.png',
          'title': 'Tensão',
          'subtitle': Math.floor(Math.random() * 220),
          'unity': ' V'
        },
        {
          'id': 2,
          'image_src': 'assets/img/tension.png',
          'title': 'Corrente',
          'subtitle': 10,
          'unity': ' A'
        },
        {
          'id': 3,
          'image_src': 'assets/img/mppt.png',
          'title': 'Potência',
          'subtitle': 10,
          'unity': ' W'
        },
      ]
    this.updateData = this.setUpdateData();
  }
  ngOnDestroy(): void {
    if (this.updateData) {
      clearInterval(this.updateData);
    }
  }

  pushPage(item_turbine:{}, position:number): void {
    this.navCtrl.push(GraphicPage, item_turbine)
  }
  setUpdateData() {
    setInterval(() => {
      var wind = Math.floor(Math.random() * (9 - 1) + 1);
      var tension = Math.floor(Math.random() * (150 - 1) + 1);
      var flow = Math.floor(Math.random() * (10 - 1) + 1);
      var power = tension * flow;

      this.turbine_datas.forEach((item) => {
        switch (item['title']) {
          case 'Velocidade do Vento':
            item['subtitle'] = wind + item['unity'];
            break;
          case 'Tensão':
            item['subtitle'] = tension + item['unity'];
            break;
          case 'Corrente':
            item['subtitle'] = flow + item['unity'];
            break;
          case 'Potência':
            item['subtitle'] = power + item['unity'];
            break;
          default:
            break;
        }
      });
    }, 2000);
  }
}
