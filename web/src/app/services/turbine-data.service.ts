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

  public getTurbineDataByCompleteDate(selected_values: Array<any>): Observable<any> {
    const apiUrl = environment.apiURL + '/start:2017-01-27&&finish:2017-12-27::' + selected_values.toString();
    return this.http.get(apiUrl, '')
      .map(res => res.json())
      .catch(err => Observable.throw(err.message));
  }
}
