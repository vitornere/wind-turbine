import { TurbineDataModel } from './../../../../../mobile/src/models/turbine-data.model';
import { ElementTableModel } from './../../models/element-table.models';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { TurbineDataService } from '../../services/turbine-data.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private turbineDataService: TurbineDataService) { }

  isLinear = false;
  showTable = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  today: Date = new Date();
  minDate: Date = new Date(2000, 0, 1); // Setar no dia em que colocar em produção
  maxDate: Date = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getUTCDate());

  displayedColumns: Array<any> = ['id', 'date'];
  dataSource: DataSourceAPI | null;

  private elements_model: ElementTableModel[];

  frequency = [
    { value: 'segundoemsegundo', viewValue: 'De segundo em segundo (60/s)' },
    { value: 'minutosemminutos', viewValue: 'De minuto em minuto (60/mim)' },
    { value: 'horaemhora', viewValue: 'De hora em hora (24/hrs)' },
    { value: 'diaemdia', viewValue: 'Diário (7 dias)' },
    { value: 'semanaemsemana', viewValue: 'Semanalmente (Semanas no mes)' },
    { value: 'mesemmes', viewValue: 'Mensalmente (12 mêses)' },
    { value: 'anual', viewValue: 'Anual' }
  ];

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      vento: new FormControl(),
      electric_voltage: new FormControl(),
      electric_current: new FormControl(),
      mppt: new FormControl()
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstDate: new FormControl()
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
      secondDate: new FormControl()
    });
    this.fourthFormGroup = this.formBuilder.group({
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
  }

  fourthFormButton() {
    const firstDate = new Date(this.secondFormGroup.value.firstDate);
    const secondDate = new Date(this.thirdFormGroup.value.secondDate);
    this.showTable = true;
    this.turbineDataService.getTurbineDataByCompleteDate(this.displayedColumns, firstDate, secondDate).retry(4).subscribe(
      res => this.elements_model = res,
    );

    this.dataSource = new DataSourceAPI(this.elements_model);
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
      , 'turbine_data_' + (this.maxDate.getFullYear().toString())
      , options
    );
  }
}
export class DataSourceAPI extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(private database: ElementTableModel[]) {
    super();
  }
  connect(): Observable<any> {
    return Observable.of(this.database)
      .retry(3);
  }
  disconnect() { }
}
