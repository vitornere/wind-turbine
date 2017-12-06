import { TurbineDataModel } from './../../models/turbine-data.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TurbineDataBase {
    datachange: BehaviorSubject<TurbineDataModel[]> = new BehaviorSubject<TurbineDataModel[]>([]);

    get data(): TurbineDataModel[] { return this.datachange.value; }

}
