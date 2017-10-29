import { ElementTableModel } from './../../models/element-table.models';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { TurbineDataService } from '../../services/turbine-data.service';


let dataElement: ElementTableModel[] = [];

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private turbineDataService: TurbineDataService) { }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  showTable = false;
  today: Date = new Date();
  minDate: Date = new Date(2000, 0, 1); // Setar no dia em que colocar em produção
  maxDate: Date = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getUTCDate());
  displayedColumns: Array<any> = ['id', 'date'];
  tableSize: number = dataElement.length;
  dataSource: TurbineDataSourceComunicationAPI = new TurbineDataSourceComunicationAPI();
  private elements_model: ElementTableModel[];

  frequency = [
    { value: 'horaemhora', viewValue: 'De hora em hora' },
    { value: 'diaemdia', viewValue: 'Diário' },
    { value: 'semanaemsemana', viewValue: 'Semanalmente' }
  ];

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      vento: new FormControl(),
      electric_voltage: new FormControl(),
      electric_current: new FormControl(),
      mppt: new FormControl()
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  // Alguém refatora
  firstFormButton() {
    // ['data', 'wind_speed', 'electric_voltage', 'electric_current', 'mppt']
    if (this.firstFormGroup.value.vento === true && this.displayedColumns.indexOf('wind_speed') === -1) {
      this.displayedColumns.push('wind_speed');
    } else if (this.firstFormGroup.value.vento === false && this.displayedColumns.indexOf('wind_speed') >= 0) {
      const indexV = this.displayedColumns.indexOf('wind_speed');
      this.displayedColumns.splice(indexV, 1);
    }

    if (this.firstFormGroup.value.electric_voltage === true && this.displayedColumns.indexOf('electric_voltage') === -1) {
      this.displayedColumns.push('electric_voltage');
    } else if (this.firstFormGroup.value.electric_voltage === false && this.displayedColumns.indexOf('electric_voltage') >= 0) {
      const idx = this.displayedColumns.indexOf('electric_voltage');
      this.displayedColumns.splice(idx, 1);
    }

    if (this.firstFormGroup.value.electric_current === true && this.displayedColumns.indexOf('electric_current') === -1) {
      this.displayedColumns.push('electric_current');
    } else if (this.firstFormGroup.value.electric_current === false && this.displayedColumns.indexOf('electric_current') >= 0) {
      const idx = this.displayedColumns.indexOf('electric_current');
      this.displayedColumns.splice(idx, 1);
    }

    if (this.firstFormGroup.value.mppt === true && this.displayedColumns.indexOf('mppt') === -1) {
      this.displayedColumns.push('mppt');
    } else if (this.firstFormGroup.value.mppt === false && this.displayedColumns.indexOf('mppt') >= 0) {
      const idx = this.displayedColumns.indexOf('mppt');
      this.displayedColumns.splice(idx, 1);
    }

    // Colocar no lugar correto ao Final da Busca
    this.showTable = true;
    this.turbineDataService.getTurbineDataByCompleteDate(this.displayedColumns).retry(4).subscribe(
      res => this.elements_model = res
    );
    console.log('Elements_model:::::');
    console.log(this.elements_model);
    dataElement = this.elements_model;
    this.formatData();
  }

  download() {
    const header = this.displayedColumns;
    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      headers: (header),
      title: this.maxDate.toString()
    };
    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(dataExample
      , 'turbine_data' + (this.maxDate.getFullYear().toString())
      , options
    );
  }

  formatData() {
    let value = 1;
    dataExample.map(
      ret => {
        ret.id = value;
        ret.date = ret.date.substr(0, 19);
        value++;
      }
    );
  }
}
export class TurbineDataSourceComunicationAPI extends DataSource<ElementTableModel> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ElementTableModel[]> {
    return Observable.of(dataExample)
      .retry(4);
  }
  disconnect() { }
}

let dataExample: ElementTableModel[] = [
  { id: 1, date: '2017-10-28T19:48:07.546132Z', wind_speed: '1.0079', electric_voltage: '110.0', electric_current: '5', mppt: '1245' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
  { id: 2, date: '2017-10-25T23:13:41.216429Z', wind_speed: '1.0079', electric_voltage: '220.0', electric_current: '40', mppt: '1345' },
];
