import { TurbineDataComponent } from './turbine-data/turbine-data.component';
import { BaseGraphicComponent } from './base-graphic/base-graphic.component';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { HistoricComponent } from './historic/historic';

@NgModule({
	declarations: [TurbineDataComponent, BaseGraphicComponent,
    ChartComponent,
    HistoricComponent],
	imports: [],
	exports: [TurbineDataComponent, BaseGraphicComponent,
    ChartComponent,
    HistoricComponent]
})
export class ComponentsModule { }
