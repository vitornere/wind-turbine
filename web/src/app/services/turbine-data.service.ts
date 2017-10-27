import { environment } from './../environment/environment.dev';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { ElementTableModel } from './../models/element-table.models';
import { TurbineDataModel } from './../models/turbine-data.models';

@Injectable()
export class TurbineDataService {

  constructor(public http: Http) {
  }

  public getLastTurbineData() {
    const apiUrl = environment.apiURL + '/last';

    return this.http.get(apiUrl)
      .toPromise()
      .then(res => res.json() as TurbineDataModel)
      .catch(() => null);
  }

  public getTurbineDataByCompleteDate() {
    // url format
    // http://localhost:8000/start:2017-01-27&&finish:2017-12-27/
    const apiUrl = environment.apiURL + '/start:2017-01-27&&finish:2017-12-27/';
    return this.http.get(apiUrl)
      .toPromise()
      .then(res => res.json() as ElementTableModel)
      .catch(() => null);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
