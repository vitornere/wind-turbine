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
        item['subtitle'] = Math.floor(Math.random() * 220);
      });
    }, 2000);
  }
}
