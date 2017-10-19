import { Component, OnInit } from '@angular/core';
import { TurbineDataModel } from '../../models/turbine-data.models';

@Component({
  selector: 'app-turbine-data',
  templateUrl: './turbine-data.component.html',
  styleUrls: ['./turbine-data.component.scss']
})
export class TurbineDataComponent implements OnInit {

  turbine_data: [TurbineDataModel];

  constructor() {
    this.turbine_data = [
      this.newTurbineDataObject(0, 'assets/img/wind.png', 'Velocidade do Vento', 15, ' m/s'),
      this.newTurbineDataObject(1, 'assets/img/volt.png', 'Tensão', 15, ' m/s'),
      this.newTurbineDataObject(2, 'assets/img/tension.png', 'Corrente', 15, ' m/s'),
      this.newTurbineDataObject(3, 'assets/img/mppt.png', 'Máxima Potência', 15, ' m/s')
    ]
  }

  ngOnInit() {
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: number, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }
}
