import { ElementTableModel } from './../../../../web/src/app/models/element-table.models';
import { TurbineDataService } from './../../providers/turbine-data-service/turbine-data-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  today: Date = new Date();
  minDate: Date = new Date(2000, 0, 1); // Setar no dia em que colocar em produção
  maxDate: Date = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getUTCDate());
  displayedColumns: Array<any> = ['date'];

  wind_speed: boolean = false;
  electric_voltage: boolean = false;
  electric_current: boolean = false;
  mppt: boolean = false;

  showPeriodo: boolean = false;
  frequencia: boolean = false;
  downloadButton: boolean

  frequency

  private elements_model: ElementTableModel[];
  timeStarts: Date;
  timeEnds: Date

  constructor(public alertCtrl: AlertController, private turbineDataService: TurbineDataService, public navCtrl: NavController, public navParams: NavParams) {
  }

  radioButton() {
    console.log(this.frequency);
  }

  datetimeButton() {
    if (this.timeStarts === undefined || this.timeEnds === undefined){
      this.showAlert('Você esqueceu de selecionar as datas');
    } else {
      this.frequencia = true;
    }
  }
  checkboxButton() {
    if (this.wind_speed === false && this.electric_voltage === false && this.electric_current === false && this.mppt === false) {
      this.showAlert('Selecione pelo menos um item');
      this.showPeriodo = false;
    } else {
      this.showPeriodo = true;
    }
  }
  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('Na página HistoryPage');
  }
  download() {
    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      title: this.maxDate.toString()
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(
      this.elements_model
      , 'turbine_data'
      , options
    );
  }

}
