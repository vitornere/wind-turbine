import { Component, Input } from '@angular/core';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.component.html'
})
export class ChartComponent {

  today = new Date();

  @Input()
  initDate: number = this.today.getFullYear();
  @Input()  
  finalDAte: number = this.today.getFullYear();

  public lineChartData:Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56,], label: this.initDate },
    { data: [65, 52, 30, 11, 36, 51, 12, 63, 59, 80, 81, 10,], label: this.finalDAte },
  ];

  public lineChartLabels:Array<any> = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public lineChartType:string = 'line';

  public randomize():void {
    let lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    console.log('aq')
    this.lineChartData = lineChartData;
  }
 

  constructor() {
    console.log(this.initDate); 
    console.log(this.initDate.toString)   
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
