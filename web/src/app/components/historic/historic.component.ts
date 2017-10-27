import { ElementTableModel } from './../../models/element-table.models';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  showTable = false;
  today: Date = new Date();
  minDate: Date = new Date(2000, 0, 1); // Setar no dia em que colocar em produção
  maxDate: Date = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getUTCDate());
  displayedColumns: Array<any> = [];
  dataSource: TurbineDataSourceComunicationAPI = new TurbineDataSourceComunicationAPI();

  frequency = [
    { value: 'horaemhora', viewValue: 'De hora em hora' },
    { value: 'diaemdia', viewValue: 'Diário' },
    { value: 'semanaemsemana', viewValue: 'Semanalmente' }
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      vento: new FormControl(),
      tensao: new FormControl(),
      corrente: new FormControl(),
      potencia: new FormControl()
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
  ngDoCheck(): void {
  }
  ngOnDestroy(): void {
    // Ainda não sei usar, mas tem que destruir o observer
    throw new Error('Method not implemented.');
  }

  // Alguém refatora
  firstFormButton() {
    // ['data', 'velocidadeDoVento', 'tensao', 'corrente', 'potencia']
    if (this.displayedColumns.indexOf('data') === -1) {
      this.displayedColumns.push('data');
    }
    if (this.firstFormGroup.value.vento === true && this.displayedColumns.indexOf('velocidadeDoVento') === -1) {
      this.displayedColumns.push('velocidadeDoVento');
    } else if (this.firstFormGroup.value.vento === false) {
      const index = this.displayedColumns.indexOf('velocidadeDoVento');
      this.displayedColumns.splice(index, 1);
    }
    if (this.firstFormGroup.value.tensao === true && this.displayedColumns.indexOf('tensao') === -1) {
      this.displayedColumns.push('tensao');
    } else if (this.firstFormGroup.value.tensao === false) {
      const index = this.displayedColumns.indexOf('tensao');
      this.displayedColumns.splice(index, 1);
    }
    if (this.firstFormGroup.value.corrente === true && this.displayedColumns.indexOf('corrente') === -1) {
      this.displayedColumns.push('corrente');
    } else if (this.firstFormGroup.value.corrente === false) {
      const index = this.displayedColumns.indexOf('corrente');
      this.displayedColumns.splice(index, 1);
    }
    if (this.firstFormGroup.value.potencia === true && this.displayedColumns.indexOf('potencia') === -1) {
      this.displayedColumns.push('potencia');
    } else if (this.firstFormGroup.value.potencia === false) {
      const index = this.displayedColumns.indexOf('potencia');
      this.displayedColumns.splice(index, 1);
    }

    // Colocar no lugar correto ao Final da Busca
    this.showTable = true;
  }

  download() {
    const data = [
      {
        position: 1,
        data: '13/12/12',
        velocidadeDoVento: 8.2,
        tensao: 12,
        corrente: 11.22,
        potencia: 10.1
      }
    ];
    const header = this.displayedColumns;
    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: (header),
      title: 'teste'
    };
    new Angular2Csv(data, 'turbine_data', options);
  }
}

export class TurbineDataSourceComunicationAPI extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ElementTableModel[]> {
    return Observable.of(data);
  }
  disconnect() { }
}

const data: ElementTableModel[] = [
  { position: 1, data: '10/10/10', velocidadeDoVento: 1.0079, tensao: 110.0, corrente: 5, potencia: 445 },
  { position: 2, data: '13/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
  { position: 2, data: '11/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
  { position: 2, data: '14/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
  { position: 2, data: '14/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
  { position: 2, data: '15/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
  { position: 2, data: '15/10/10', velocidadeDoVento: 1.0079, tensao: 220.0, corrente: 40, potencia: 1145 },
];
