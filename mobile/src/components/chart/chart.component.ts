import { Component, Input } from '@angular/core';
import { TurbineDataService } from '../../providers/turbine-data-service/turbine-data-service';

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

  constructor(private turbineDataService: TurbineDataService) {
  }
  today = new Date();
  showChart = false;

  @Input()
  inputInitYear: number = this.today.getFullYear();
  @Input()
  inputFinalYear: number = this.today.getFullYear();

  firstYear = {
    data: [5, 25000, 30000, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    label: this.inputInitYear,
    stats : {
      highStat : 0, 
      highStatLabel: "",
      lowStat: 0,
      lowStatLabel: ""
    }
  }

  secondYear = {
    data: [1230000, 1130000, 30000, 930000, 830000, 730000, 630000, 530000, 430000, 330000, 1230000, 3330000],
    label: this.inputFinalYear,
    stats : {
      highStat : 0, 
      highStatLabel: "",
      lowStat: 0,
      lowStatLabel: ""
    }
  }

  public lineChartData: Array<any> = [
    this.firstYear,
    this.secondYear
  ];

  public lineChartLabels: Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public lineChartType: string = 'line';

  public updateYear(): void {
    let lineChartData: Array<any> = new Array(this.lineChartData.length);

    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = { 
        data: new Array(this.lineChartData[i].data.length), 
        label: this.lineChartData[i].label 
      };
      //lineChartData[i].data = [0.12, 1230000, 1130000,1130000, 30000, 930000, 830000, 730000, 630000, 530000, 430000, 330000, 1230000, 3330000]
      this.turbineDataService.getTurbineDataByYear(
        this.inputInitYear.toString(), 
        this.inputFinalYear.toString(), 
        'mppt'
      ).retry(3).subscribe(
        res => {
          lineChartData[i].data = res.firstYear;
          console.log(res);
          console.log(lineChartData[i].data);
        }
      );
    }
    lineChartData[0].label = this.inputInitYear;
    lineChartData[1].label = this.inputFinalYear;

    this.firstYear = lineChartData[0];
    this.secondYear = lineChartData[1];

    this.lineChartData = lineChartData;

    this.firstYear.stats = this.statsChart(this.firstYear);
    this.secondYear.stats = this.statsChart(this.secondYear);

    this.statsChart(this.secondYear);

    this.showChart = true;
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public statsChart(year: any): any{
    let highStat = 0;
    let lowStat = 1000;
    let highStatLabel;
    let lowStatLabel;

    for (let i = 0; i < year.data.length; i++) {
      if (year.data[i] > highStat) {
        highStat = year.data[i];
        highStatLabel = this.lineChartLabels[i];

      }
      if (year.data[i] < lowStat) {
        lowStat = year.data[i];
        lowStatLabel = this.lineChartLabels[i];
      }
    }
    return {
        highStat : highStat, 
        highStatLabel: highStatLabel,
        lowStat: lowStat,
        lowStatLabel: lowStatLabel
      }
  }

} 
/*
      this.turbineDataService.getTurbineDataByYear(
        this.inputInitYear.toString(), 
        this.inputFinalYear.toString(), 
        'mppt'
      ).retry(2).subscribe(
        res=>{
          lineChartData[i].data = i===0 ? res.firstYear : res.secondYear;
          console.log(lineChartData[i].data);
        }
      );
*/