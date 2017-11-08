import { TurbineDataService } from './../../providers/turbine-data-service/turbine-data-service';
import { ElementTableModel } from './../../../../web/src/app/models/element-table.models';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { AlertController } from 'ionic-angular';

import 'rxjs/Rx';

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
  noData: boolean;
  frequency

  private elements_model: ElementTableModel[];
  timeStarts: Date;
  timeEnds: Date

  constructor(public alertCtrl: AlertController, private turbineDataService: TurbineDataService, public navCtrl: NavController, public navParams: NavParams) {
  }

  radioButton() {
    console.log(this.timeStarts);
    console.log(this.timeEnds);
    if (this.frequency === undefined) {
      this.showAlert('Opps!', 'Selecione a frequência dos dados');
      this.downloadButton = false;
    } else {
      this.turbineDataService.getTurbineDataByCompleteDate(
        this.frequency,
        this.displayedColumns,
        this.timeStarts,
        this.timeEnds
      ).retry(3)
        .subscribe(
        res => {
          this.elements_model = res;
          if (this.elements_model.length > 1) {
            this.noData = false;
            this.format();
            this.downloadButton = true;
            this.showAlert('Download', 'Busca realizada com sucesso!')
          } else {
            this.downloadButton = false;
            this.noData = true;
          }
        });
    }
    console.log(this.frequency);
  }

  datetimeButton() {
    if (this.timeStarts === undefined || this.timeEnds === undefined) {
      this.showAlert('Opps!', 'Você esqueceu de selecionar as datas');
    } else {
      this.frequencia = true;
    }
  }
  checkboxButton() {
    if (this.wind_speed === false && this.electric_voltage === false && this.electric_current === false && this.mppt === false) {
      this.showAlert('Opps!', 'Selecione pelo menos um item');
      this.showPeriodo = false;
    } else {

      if (this.wind_speed === true && this.displayedColumns.indexOf('wind_speed') === -1) {
        this.displayedColumns.push('wind_speed');
      } else if (this.wind_speed === false && this.displayedColumns.indexOf('wind_speed') >= 0) {
        const indexV = this.displayedColumns.indexOf('wind_speed');
        this.displayedColumns.splice(indexV, 1);
      }

      if (this.electric_voltage === true && this.displayedColumns.indexOf('electric_voltage') === -1) {
        this.displayedColumns.push('electric_voltage');
      } else if (this.electric_voltage === false && this.displayedColumns.indexOf('electric_voltage') >= 0) {
        const idx = this.displayedColumns.indexOf('electric_voltage');
        this.displayedColumns.splice(idx, 1);
      }

      if (this.electric_current === true && this.displayedColumns.indexOf('electric_current') === -1) {
        this.displayedColumns.push('electric_current');
      } else if (this.electric_current === false && this.displayedColumns.indexOf('electric_current') >= 0) {
        const idx = this.displayedColumns.indexOf('electric_current');
        this.displayedColumns.splice(idx, 1);
      }

      if (this.mppt === true && this.displayedColumns.indexOf('mppt') === -1) {
        this.displayedColumns.push('mppt');
      } else if (this.mppt === false && this.displayedColumns.indexOf('mppt') >= 0) {
        const idx = this.displayedColumns.indexOf('mppt');
        this.displayedColumns.splice(idx, 1);
      }

      this.showPeriodo = true;
    }
  }
  showAlert(title: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
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

  format(): void {
    this.elements_model.map(
      res => {
        res.date = res.date.slice(0, 19).replace('T', ' ');
      }
    );
  }

}
