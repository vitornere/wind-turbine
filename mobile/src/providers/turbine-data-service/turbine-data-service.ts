import { TurbineDataModel } from './../../models/turbine-data.model';
import { ElementTableModel } from './../../models/element-table.model';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environment/environment.dev";

/*
  Generated class for the TurbineDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TurbineDataService {

  constructor(public http: Http) {
  }

  public getLastTurbineData(): Observable<ElementTableModel> {
    const apiUrl = environment.apiURL + '/last';

    return this.http.get(apiUrl)
      .map(res => res.json());
  }

  public getTurbineDataByCompleteDate(period: String, selected_values: Array<any>, firstDate: Date, secondDate: Date): Observable<any> {
    // period:second&&start:2000-1-1&&finish:2017-11-6::id,date,wind_speed
    const apiUrl = environment.apiURL
      + '/period:' + period.toString()
      + '&&start:' + firstDate
      + '&&finish:' + secondDate
      + '::' + selected_values.toString();

    return this.http.get(apiUrl)
      .map(res => res.json())
      .catch(err => Observable.throw(err.message));
  }

  public getTurbineDataByYear(start_year: String, finish_year: String, selected_value:String): Observable<any> {
    // start_year:2016&&finish_year:2017::wind_speed/
    const apiUrl = environment.apiURL
    + '/start_year:' + start_year
    + '&&finish_year:' + finish_year
    + '::' + selected_value;

  return this.http.get(apiUrl)
    .map(res => res.json())
    .catch(err => Observable.throw(err.message));
  }
}
