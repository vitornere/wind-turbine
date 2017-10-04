import { TurbineDataModel } from './../../models/turbine-data.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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

  public getLastTurbineData(): Observable<TurbineDataModel> {
    const apiUrl = environment.apiURL + '/turbine-data/last';

    return this.http.get(apiUrl)
      .map(res => res.json());
  }
}
