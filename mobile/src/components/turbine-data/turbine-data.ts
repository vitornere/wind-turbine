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
          'image_src': 'assets/img/wind.jpg',
          'title': 'Velocidade do Vento',
          'subtitle': 4,
          'unity': ' m/s'
        },
        {
          'image_src': 'assets/img/voltagem.jpg',
          'title': 'Voltagem da Turbina',
          'subtitle': Math.floor(Math.random() * 220),
          'unity': ' V'
        },
        {
          'image_src': 'assets/img/tensao.jpg',
          'title': 'Tensão',
          'subtitle': 10,
          'unity': ' A'
        },
        {
          'image_src': 'assets/img/MPPT.png',
          'title': 'MPPT',
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
      this.turbine_datas.forEach((item) => {
        item['subtitle'] = Math.floor(Math.random() * 220) + item['unity'];
      });
    }, 2000);
  }
}
