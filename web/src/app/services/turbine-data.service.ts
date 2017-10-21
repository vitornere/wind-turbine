import { environment } from './../environment/environment.dev';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
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

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
