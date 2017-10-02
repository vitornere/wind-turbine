import { TurbineDataComponent } from './components/turbine-data/turbine-data.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoricComponent } from './components/historic/historic.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TurbineDataComponent
  },
  {
    path:'historic',
    component: HistoricComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
