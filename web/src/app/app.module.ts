import { AppRoutingModule } from './app-routing.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MdButtonModule, MdCheckboxModule, MatStepperModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TurbineDataComponent } from './components/turbine-data/turbine-data.component';
import { ChartComponent } from './components/chart/chart.component';
import { HistoricComponent } from './components/historic/historic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TurbineDataComponent,
    SideBarComponent,
    ChartComponent,
    HistoricComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MatSidenavModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
