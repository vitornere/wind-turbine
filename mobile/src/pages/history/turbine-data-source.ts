import { MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import { TurbineDataModel } from './../../models/turbine-data.model';

export class DataSourceAPI extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    constructor(
        private _database: TurbineDataModel[],
        private _paginator: MatPaginator
    ) {
        super();
    }

    connect(): Observable<TurbineDataModel[]> {
        const displayDataChanges = [
            this._paginator.page,
            this._database
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._database.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {
        // No-op
    }

}
