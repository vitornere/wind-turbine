import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TurbineDataModel } from './../../models/turbine-data.model';

@Injectable()
export class TurbineDataBase {
    datachange: BehaviorSubject<TurbineDataModel[]> = new BehaviorSubject<TurbineDataModel[]>([]);

    get data(): TurbineDataModel[] { return this.datachange.value; }

}
