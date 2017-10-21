import { environment } from './../environment/environment.dev';
import { TurbineDataModel } from './../models/turbine-data.models';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ComunicationApiService {

  constructor(private http: HttpClient) { }

}
