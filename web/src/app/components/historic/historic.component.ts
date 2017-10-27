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
  today = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getUTCDate());
  // Preenchido pelo form
  displayedColumns = [];
  dataSource = new ExampleDataSource();

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
    //console.log('In do check method');
    //console.log(this.firstFormGroup);
  }
  ngOnDestroy(): void {
    // Ainda não sei usar, mas tem que destruir o observer
    throw new Error("Method not implemented.");
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
    const header = ['Posição', 'Data', 'Velocidade do Vento', 'Tensao', 'Corrente', 'Potência'];
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

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }
  disconnect() { }
}

export interface Element {
  position: number;
  data: string;
  velocidadeDoVento: number;
  tensao: string;
  corrente: string;
  potencia: string;
}

const data: Element[] = [
  { position: 1, data: 'Hydrogen', velocidadeDoVento: 1.0079, tensao: 'H', corrente: 'teste', potencia: 'teste' },
];
