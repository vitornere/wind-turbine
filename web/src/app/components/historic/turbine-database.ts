import { ElementTableModel } from './../../models/element-table.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TurbineDataBase {
    datachange: BehaviorSubject<ElementTableModel[]> = new BehaviorSubject<ElementTableModel[]>([]);

    get data(): ElementTableModel[] { return this.datachange.value; }

}
