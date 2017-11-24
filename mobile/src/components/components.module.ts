import { TurbineDataComponent } from './turbine-data/turbine-data.component';
import { BaseGraphicComponent } from './base-graphic/base-graphic.component';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [TurbineDataComponent, BaseGraphicComponent],
	imports: [],
	exports: [TurbineDataComponent, BaseGraphicComponent]
})
export class ComponentsModule { }
