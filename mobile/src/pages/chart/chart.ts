import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  turbine_datas:{};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navParams.get('item_turbine');
    this.turbine_datas = navParams.data;
  }

  ionViewDidLoad() {
  }

}