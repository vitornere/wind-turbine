import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public event = {
    timeStarts: '1990-02-20',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
