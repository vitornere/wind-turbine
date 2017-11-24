import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { TurbineDataComponent } from './../components/turbine-data/turbine-data.component';
import { BaseGraphicComponent } from './../components/base-graphic/base-graphic.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { BancadaOnline } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HistoryPage } from './../pages/history/history';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GraphicPage } from './../pages/graphic/graphic.page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TurbineDataService } from '../providers/turbine-data-service/turbine-data-service';
import { LoadindScreenProvider } from '../providers/loadind-screen/loadind-screen';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(BancadaOnline),
    ChartsModule,
    HttpModule,
    CustomMaterialModule
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
    BaseGraphicComponent,  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TurbineDataService,
    LoadindScreenProvider
  ]
})
export class AppModule {}
