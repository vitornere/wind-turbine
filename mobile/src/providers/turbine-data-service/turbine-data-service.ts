import { TurbineDataModel } from './../../models/turbine-data.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
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

  public getLastTurbineData() {
    const apiUrl = environment.apiURL + '/last';

    return this.http.get(apiUrl)
      .toPromise()
      .then(res => res.json() as TurbineDataModel)
      .catch(() => false);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
