import { TurbineDataComponent } from './turbine-data/turbine-data.component';
import { BaseGraphicComponent } from './base-graphic/base-graphic.component';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

@NgModule({
	declarations: [TurbineDataComponent, BaseGraphicComponent,
    ChartComponent],
	imports: [],
	exports: [TurbineDataComponent, BaseGraphicComponent,
    ChartComponent]
})
export class ComponentsModule { }
