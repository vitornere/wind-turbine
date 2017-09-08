import { NgModule } from '@angular/core';
import { TurbineDataComponent } from './turbine-data/turbine-data';
import { HistoryGraphicComponent } from './history-graphic/history-graphic';
import { SearchDataComponent } from './search-data/search-data';

@NgModule({
	declarations: [TurbineDataComponent, HistoryGraphicComponent,
    SearchDataComponent],
	imports: [],
	exports: [TurbineDataComponent, HistoryGraphicComponent,
    SearchDataComponent]
})
export class ComponentsModule { }
