import { NgModule } from '@angular/core';
import { TurbineDataComponent } from './turbine-data/turbine-data';
import { HistoryGraphicComponent } from './history-graphic/history-graphic';
import { SearchDataComponent } from './search-data/search-data';
import { ChartComponent } from './chart/chart';

@NgModule({
	declarations: [TurbineDataComponent, HistoryGraphicComponent,
    SearchDataComponent,
    ChartComponent],
	imports: [],
	exports: [TurbineDataComponent, HistoryGraphicComponent,
    SearchDataComponent,
    ChartComponent]
})
export class ComponentsModule { }
