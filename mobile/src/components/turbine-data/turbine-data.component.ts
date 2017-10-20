import { LoadindScreenProvider } from './../../providers/loadind-screen/loadind-screen';
import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GraphicPage } from './../../pages/graphic/graphic.page';
import { TurbineDataModel } from '../../models/turbine-data.model';
import { TurbineDataService } from '../../providers/turbine-data-service/turbine-data-service';

@Component({
  selector: 'turbine-data',
  templateUrl: 'turbine-data.component.html'
})
export class TurbineDataComponent implements OnDestroy {

  turbine_datas: [{
    id: number,
    image_src: string;
    title: string,
    subtitle: number,
    unity: string
  }];
  updateData: any;
  clickMessage = 'Teste';

  constructor(
    private navCtrl: NavController,
    private turbineDataService: TurbineDataService,
    private loadingCtrl: LoadindScreenProvider
  ) {
    this.loadingCtrl.showLoading('Procurando servidor... Entre no Wifi da Bancada Online. Senha: aerogerador.');
    this.turbine_datas = null;
    /*
    this.turbine_datas =
      [
        {
          id: 0,
          image_src: 'assets/img/wind.png',
          title: 'Velocidade do Vento',
          subtitle: Math.floor(Math.random() * (9 - 1) + 1),
          unity: ' m/s'
        },
        {
          id: 1,
          image_src: 'assets/img/volt.png',
          title: 'Tensão',
          subtitle: Math.floor(Math.random() * (150 - 1) + 1),
          unity: ' V'
        },
        {
          id: 2,
          image_src: 'assets/img/tension.png',
          title: 'Corrente',
          subtitle: Math.floor(Math.random() * (10 - 1) + 1),
          unity: ' A'
        },
        {
          id: 3,
          image_src: 'assets/img/mppt.png',
          title: 'Máxima Potência',
          subtitle: Math.floor(Math.random() * (10 - 1) + 1),
          unity: ' W'
        },
      ]
      */

    this.updateData = this.setUpdateData();
  }
  ngOnDestroy(): void {
    if (this.updateData) {
      clearInterval(this.updateData);
    }
  }

  pushPage(item_turbine: {}, position: number): void {
    this.navCtrl.push(GraphicPage, item_turbine)
  }
  setUpdateData() {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData()
        .then(res => {
          if (res != null) {
            const values = res as TurbineDataModel;

            if (this.turbine_datas != null) {
              this.turbine_datas[0].subtitle = res.wind_speed;
              this.turbine_datas[1].subtitle = res.electric_voltage;
              this.turbine_datas[2].subtitle = res.electric_current;
              this.turbine_datas[3].subtitle = res.mppt;
            } else {
              this.turbine_datas =
                [
                  {
                    id: 0,
                    image_src: 'assets/img/wind.png',
                    title: 'Velocidade do Vento',
                    subtitle: res.wind_speed,
                    unity: ' m/s'
                  },
                  {
                    id: 1,
                    image_src: 'assets/img/volt.png',
                    title: 'Tensão',
                    subtitle: res.electric_voltage,
                    unity: ' V'
                  },
                  {
                    id: 2,
                    image_src: 'assets/img/tension.png',
                    title: 'Corrente',
                    subtitle: res.electric_current,
                    unity: ' A'
                  },
                  {
                    id: 3,
                    image_src: 'assets/img/mppt.png',
                    title: 'Máxima Potência',
                    subtitle: res.mppt,
                    unity: ' W'
                  },
                ];
            }

            if(this.loadingCtrl.isLoading()) {
              this.loadingCtrl.dismiss();
            }
          } else {
            if(this.loadingCtrl.isLoading() == false) {
              this.loadingCtrl.showLoading('Procurando servidor... Entre no Wifi da Bancada Online. Senha: aerogerador.');
            }
          }
        });

      /*
      this.turbine_datas[0].subtitle = Math.floor(Math.random() * (9 - 1) + 1);
      this.turbine_datas[1].subtitle = Math.floor(Math.random() * (150 - 1) + 1);
      this.turbine_datas[2].subtitle = Math.floor(Math.random() * (10 - 1) + 1);
      this.turbine_datas[3].subtitle = this.turbine_datas[2].subtitle + this.turbine_datas[3].subtitle;
      */
    }, 2000);
  }
}
