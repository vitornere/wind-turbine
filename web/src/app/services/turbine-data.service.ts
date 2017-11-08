import { environment } from './../environment/environment.dev';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


import { ElementTableModel } from './../models/element-table.models';
import { TurbineDataModel } from './../models/turbine-data.models';

@Injectable()
export class TurbineDataService {

  constructor(public http: Http) {
  }

  // Object {wind_speed: 11.1, electric_voltage: 11.1, electric_current: 11.1, mppt: 11.1, date: "2017-10-27T00:14:43.831327Z"}
  public getLastTurbineData(): Observable<ElementTableModel> {
    const apiUrl = environment.apiURL + '/last';

    return this.http.get(apiUrl)
      .map(res => res.json())
      .catch(err => Observable.throw(err.message));
  }

  public getTurbineDataByCompleteDate(period: String, selected_values: Array<any>, firstDate: Date, secondDate: Date): Observable<any> {

    const startYear: string = firstDate.getFullYear() + '-' + (firstDate.getUTCMonth() + 1) + '-' + firstDate.getDate();
    const finishYear: string = secondDate.getFullYear() + '-' + (secondDate.getUTCMonth() + 1) + '-' + secondDate.getDate();

    // /period:second&&start:2000-1-1&&finish:2017-11-6::id,date,wind_speed
    const apiUrl = environment.apiURL
      + '/period:' + period.toString()
      + '&&start:' + startYear
      + '&&finish:' + finishYear
      + '::' + selected_values.toString();

    return this.http.get(apiUrl, '')
      .map(res => res.json())
      .catch(err => Observable.throw(err.message));
  }
}
