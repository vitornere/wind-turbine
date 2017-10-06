import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  displayedColumns = ['position', 'data', 'velocidadeDoVento', 'tensao', 'corrente', 'potencia'];
  dataSource = new ExampleDataSource();

  frequency = [
    {value: 'horaemhora', viewValue: 'De hora em hora'},
    {value: 'diaemdia', viewValue: 'Diário'},
    {value: 'semanaemsemana', viewValue: 'Semanalmente'}
  ];

  constructor(private _formBuilder: FormBuilder) { }

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
  {position: 1, data: 'Hydrogen', velocidadeDoVento: 1.0079, tensao: 'H', corrente:'teste', potencia:'teste'},
  {position: 2, data: 'Helium', velocidadeDoVento: 4.0026, tensao: 'He', corrente:'teste', potencia:'teste'},
  {position: 3, data: 'Lithium', velocidadeDoVento: 6.941, tensao: 'Li', corrente:'teste', potencia:'teste'},
  {position: 4, data: 'Beryllium', velocidadeDoVento: 9.0122, tensao: 'Be', corrente:'teste', potencia:'teste'},
  {position: 5, data: 'Boron', velocidadeDoVento: 10.811, tensao: 'B', corrente:'teste', potencia:'teste'},
  {position: 6, data: 'Carbon', velocidadeDoVento: 12.0107, tensao: 'C', corrente:'teste', potencia:'teste'},
  {position: 7, data: 'Nitrogen', velocidadeDoVento: 14.0067, tensao: 'N', corrente:'teste', potencia:'teste'},
  {position: 8, data: 'Oxygen', velocidadeDoVento: 15.9994, tensao: 'O', corrente:'teste', potencia:'teste'},
  {position: 9, data: 'Fluorine', velocidadeDoVento: 18.9984, tensao: 'F', corrente:'teste', potencia:'teste'},
  {position: 10, data: 'Neon', velocidadeDoVento: 20.1797, tensao: 'Ne', corrente:'teste', potencia:'teste'},
  {position: 11, data: 'Sodium', velocidadeDoVento: 22.9897, tensao: 'Na', corrente:'teste', potencia:'teste'},
  {position: 12, data: 'Magnesium', velocidadeDoVento: 24.305, tensao: 'Mg', corrente:'teste', potencia:'teste'},
  {position: 13, data: 'Aluminum', velocidadeDoVento: 26.9815, tensao: 'Al', corrente:'teste', potencia:'teste'},
  {position: 14, data: 'Silicon', velocidadeDoVento: 28.0855, tensao: 'Si', corrente:'teste', potencia:'teste'},
  {position: 15, data: 'Phosphorus', velocidadeDoVento: 30.9738, tensao: 'P', corrente:'teste', potencia:'teste'},
  {position: 16, data: 'Sulfur', velocidadeDoVento: 32.065, tensao: 'S', corrente:'teste', potencia:'teste'},
  {position: 17, data: 'Chlorine', velocidadeDoVento: 35.453, tensao: 'Cl', corrente:'teste', potencia:'teste'},
  {position: 18, data: 'Argon', velocidadeDoVento: 39.948, tensao: 'Ar', corrente:'teste', potencia:'teste'},
  {position: 19, data: 'Potassium', velocidadeDoVento: 39.0983, tensao: 'K', corrente:'teste', potencia:'teste'},
  {position: 20, data: 'Calcium', velocidadeDoVento: 40.078, tensao: 'Ca', corrente:'teste', potencia:'teste'},
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}
