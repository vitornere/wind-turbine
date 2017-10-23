import { TurbineDataService } from './../../services/turbine-data.service';
import { Component, OnInit } from '@angular/core';
import { TurbineDataModel } from '../../models/turbine-data.models';

@Component({
  selector: 'app-turbine-data',
  templateUrl: './turbine-data.component.html',
  styleUrls: ['./turbine-data.component.scss']
})
export class TurbineDataComponent implements OnInit {

  public turbine_data: [TurbineDataModel];
  public updateData: any;

  constructor(private turbineDataService: TurbineDataService) {
    this.turbine_data = [
      this.newTurbineDataObject(0, 'assets/img/wind.png', 'Velocidade do Vento', 0, ' m/s'),
      this.newTurbineDataObject(1, 'assets/img/volt.png', 'Tensão', 0, ' m/s'),
      this.newTurbineDataObject(2, 'assets/img/tension.png', 'Corrente', 0, ' m/s'),
      this.newTurbineDataObject(3, 'assets/img/mppt.png', 'Máxima Potência', 0, ' m/s')
    ];
    this.updateData = this.setUpdateData();
  }

  ngOnInit() {
  }
  setUpdateData(): any {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData().then(
        res => {
          this.turbine_data[0].subtitle = res.wind_speed;
          this.turbine_data[1].subtitle = res.electric_voltage;
          this.turbine_data[2].subtitle = res.electric_current;
          this.turbine_data[3].subtitle = res.mppt;
        }
      );
    }, 2000);
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: number, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }
}
