import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Loading, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class LoadindScreenProvider {

  private loading: Loading;
  private loaded: boolean;

  constructor(
    private loadingCtrl: LoadingController
  ) {  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });

    this.loading.present();
    this.loaded = true;
  }

  dismiss() {
    this.loading.dismiss();
    this.loaded = false;
  }

  isLoading() {
    return this.loaded;
  }

}
