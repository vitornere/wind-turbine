import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphic',
  templateUrl: 'graphic.page.html',
})
export class GraphicPage {

  turbine_datas:{};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navParams.get('item_turbine');
    this.turbine_datas = navParams.data;
    console.log(this.turbine_datas); 
  }

  ionViewDidLoad() {
  }

}
