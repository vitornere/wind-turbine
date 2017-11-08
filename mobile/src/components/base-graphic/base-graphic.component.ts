import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoryPage } from '../../pages/history/history';

/**
 * Generated class for the HistoryGraphicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'base-graphic',
  templateUrl: 'base-graphic.component.html'
})
export class BaseGraphicComponent {

  @Input()
  id: number;
  @Input()  
  titulo: string;
  @Input()  
  imageSrc: string;

  constructor(private navCtrl: NavController) {
    console.log("Esta no history grafic");
  }

  goToHistory() {
    this.navCtrl.parent.select(1);
  }

}
