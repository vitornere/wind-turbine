import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HistoryPage } from './../pages/history/history';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GraphicPage } from './../pages/graphic/graphic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TurbineDataComponent } from '../components/turbine-data/turbine-data';
import { HistoryGraphicComponent } from './../components/history-graphic/history-graphic';
import { ChartComponent } from '../components/chart/chart';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HistoryPage,
    GraphicPage,
    HomePage,
    TabsPage,
    TurbineDataComponent,
    HistoryGraphicComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HistoryPage,
    HomePage,
    TabsPage,
    GraphicPage,
    TurbineDataComponent,
    HistoryGraphicComponent,
    ChartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
