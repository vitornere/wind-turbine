import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TurbineDataComponent } from './components/turbine-data/turbine-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TurbineDataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
