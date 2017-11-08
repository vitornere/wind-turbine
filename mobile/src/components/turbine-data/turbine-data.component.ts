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

  turbine_datas: [TurbineDataModel];
  updateData: any;
  clickMessage = 'Teste';

  constructor(
    private navCtrl: NavController,
    private turbineDataService: TurbineDataService,
    private loadingCtrl: LoadindScreenProvider
  ) {
    this.loadingCtrl.showLoading('Procurando servidor... Entre no Wifi da Bancada Online. Senha: aerogerador.');
    this.turbine_datas = [
      this.newTurbineDataObject(0, 'assets/img/wind.png', 'Velocidade do Vento', '', ' m/s'),
      this.newTurbineDataObject(1, 'assets/img/volt.png', 'Tensão', '', ' A'),
      this.newTurbineDataObject(2, 'assets/img/tension.png', 'Corrente', '', ' v'),
      this.newTurbineDataObject(3, 'assets/img/mppt.png', 'Máxima Potência', '', ' W')
    ];

    this.updateData = this.setUpdateData();
  }
  setUpdateData() {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData()
        .subscribe(res => {
          if (res != null) {
            this.turbine_datas[0].subtitle = res.wind_speed;
            this.turbine_datas[1].subtitle = res.electric_voltage;
            this.turbine_datas[2].subtitle = res.electric_current;
            this.turbine_datas[3].subtitle = res.mppt;

            if (this.loadingCtrl.isLoading()) {
              this.loadingCtrl.dismiss();
            }
          } else {
            if (this.loadingCtrl.isLoading() == false) {
              this.loadingCtrl.showLoading('Procurando servidor... Entre no Wifi da Bancada Online. Senha: aerogerador.');
            }
          }
        });
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.updateData) {
      clearInterval(this.updateData);
    }
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: string, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }

  pushPage(item_turbine: {}, position: number): void {
    this.navCtrl.push(GraphicPage, item_turbine)
  }
}
