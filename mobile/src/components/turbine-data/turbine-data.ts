import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'turbine-data',
  templateUrl: 'turbine-data.html'
})
export class TurbineDataComponent implements OnDestroy {

  turbine_datas: [{}];
  updateData: any;
  clickMessage = 'Teste';

  constructor() {
    this.turbine_datas =
      [
        {
          'image_src': 'assets/img/wind.png',
          'title': 'Velocidade do Vento',
          'subtitle': 4,
          'unity': ' m/s'
        },
        {
          'image_src': 'assets/img/volt.png',
          'title': 'Tensão',
          'subtitle': Math.floor(Math.random() * 220),
          'unity': ' V'
        },
        {
          'image_src': 'assets/img/tension.png',
          'title': 'Corrente',
          'subtitle': 10,
          'unity': ' A'
        },
        {
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

  onClickMe() {
    this.clickMessage += 'You are my hero!';
    console.log('clickMessage');
  }

  setUpdateData() {
    setInterval(() => {
      var wind = Math.floor(Math.random() * (9 - 1) + 1);
      var tension = Math.floor(Math.random() * (150 - 1) + 1);
      var flow = Math.floor(Math.random() * (10 - 1) + 1);
      var power = tension * flow;

      this.turbine_datas.forEach((item) => {

        console.log(flow + ' x ' + tension + " = " + power);

        if (item['title'] === 'Velocidade do Vento') {
          item['subtitle'] = wind + item['unity'];
        } else
        if (item['title'] === 'Tensão') {
          item['subtitle'] = tension + item['unity'];
        } else
        if (item['title'] === 'Corrente') {
          item['subtitle'] = flow + item['unity'];
        } else 
        if (item['title'] === 'Potência') {
          item['subtitle'] = power + item['unity'];
        }
      });
    }, 2000);
  }
}
