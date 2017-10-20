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
    this.turbine_datas = null;
    this.updateData = this.setUpdateData();
  }
  setUpdateData() {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData()
        .then(res => {
          if (res != null) {
            if (this.turbine_datas != null) {
              this.turbine_datas[0].subtitle = res.wind_speed;
              this.turbine_datas[1].subtitle = res.electric_voltage;
              this.turbine_datas[2].subtitle = res.electric_current;
              this.turbine_datas[3].subtitle = res.mppt;
            } else {
              this.turbine_datas = [
                this.newTurbineDataObject(0, 'assets/img/wind.png', 'Velocidade do Vento', 0, ' m/s'),
                this.newTurbineDataObject(1, 'assets/img/volt.png', 'Tensão', 0, ' m/s'),
                this.newTurbineDataObject(2, 'assets/img/tension.png', 'Corrente', 0, ' m/s'),
                this.newTurbineDataObject(3, 'assets/img/mppt.png', 'Máxima Potência', 0, ' m/s')
              ]
            }

            if (this.loadingCtrl.isLoading()) {
              this.loadingCtrl.dismiss();
            }
          } else {
            if (this.loadingCtrl.isLoading() == false) {
              this.loadingCtrl.showLoading('Procurando servidor... Entre no Wifi da Bancada Online. Senha: aerogerador.');
            }
          }
        });
    }, 2000);
  }
  ngOnDestroy(): void {
    if (this.updateData) {
      clearInterval(this.updateData);
    }
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: number, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }

  pushPage(item_turbine: {}, position: number): void {
    this.navCtrl.push(GraphicPage, item_turbine)
  }
}
