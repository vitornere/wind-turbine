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
  showChart = false;
  highStatMonth: string;
  lowStatMonth: string;
  defaultHigh = 0;
  defaultLow = 220;

  @Input()
  initYear: number = this.today.getFullYear();
  @Input()
  finalYear: number = this.today.getFullYear();

  firstYear = { 
    data: [1, 2, 30000, 4, 5, 6, 7, 8, 9, 10, 11, 12], 
    label: this.initYear 
  }  
  
  secondYear = { 
    data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 
    label: this.finalYear 
  }  
  
  public lineChartData: Array<any> = [
    this.firstYear,
    this.secondYear
  ];

  public lineChartLabels: Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public lineChartType: string = 'line';

  
  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  highStat: number = this.defaultHigh;
  lowStat: number = this.defaultLow;

  public statsChart(): void {

        for (let i = 0; i < this.firstYear.data.length; i++){
          if(this.firstYear.data[i]>this.highStat){
            this.highStat = this.firstYear.data[i];
            this.highStatMonth = this.lineChartLabels[i];
      
          }
          if(this.firstYear.data[i]<this.lowStat){
            this.lowStat = this.firstYear.data[i];
            this.lowStatMonth = this.lineChartLabels[i];
            console.log(i);
            console.log('stat [lowstat]'+ this.lowStat);
            console.log('stat [data] '+ this.firstYear.data[i]);
          }
        }
        console.log(this.lowStatMonth +" - "+ this.lowStat);
        console.log(this.highStatMonth +" - "+ this.highStat);
      }

  public updateYear(): void {
    let lineChartData: Array<any> = new Array(this.lineChartData.length);

    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    lineChartData[0].label = this.initYear;
    lineChartData[1].label = this.finalYear;
    
    this.firstYear = this.lineChartData[0];
    this.lineChartData = lineChartData;
    this.highStat = this.defaultHigh;
    this.lowStat = this.defaultLow;
    this.statsChart();
    this.showChart=true;
  }
  
} 