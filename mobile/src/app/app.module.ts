import { TurbineDataComponent } from './../components/turbine-data/turbine-data.component';
import { BaseGraphicComponent } from './../components/base-graphic/base-graphic.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BancadaOnline } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HistoryPage } from './../pages/history/history';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GraphicPage } from './../pages/graphic/graphic.page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartComponent } from '../components/chart/chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    BancadaOnline,
    AboutPage,
    HistoryPage,
    GraphicPage,
    HomePage,
    TabsPage,
    TurbineDataComponent,
    BaseGraphicComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(BancadaOnline),
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BancadaOnline,
    AboutPage,
    HistoryPage,
    HomePage,
    TabsPage,
    GraphicPage,
    TurbineDataComponent,
    BaseGraphicComponent,
    ChartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
