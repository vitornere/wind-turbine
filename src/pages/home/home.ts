import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TurbineDataComponent } from '../../components/turbine-data/turbine-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
