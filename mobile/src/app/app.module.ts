import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurbineDataComponent } from './../components/turbine-data/turbine-data.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { BancadaOnline } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HistoryPage } from './../pages/history/history';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TurbineDataService } from '../providers/turbine-data-service/turbine-data-service';
import { LoadindScreenProvider } from '../providers/loadind-screen/loadind-screen';

@NgModule({
  declarations: [
    BancadaOnline,
    AboutPage,
    HistoryPage,
    HomePage,
    TabsPage,
    TurbineDataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(BancadaOnline),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BancadaOnline,
    AboutPage,
    HistoryPage,
    HomePage,
    TabsPage,
    TurbineDataComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TurbineDataService,
    LoadindScreenProvider
  ]
})
export class AppModule { }
