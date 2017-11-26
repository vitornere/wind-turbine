import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TurbineDataService } from '../../providers/turbine-data-service/turbine-data-service';

/**
 * Generated class for the HistoryGraphicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'graphic',
  templateUrl: 'graphic.html'
})
export class GraphicComponent {

  @Input()
  id: number;
  @Input()
  titulo: string;
  @Input()
  imageSrc: string;

  constructor(private navCtrl: NavController, private turbineDataService: TurbineDataService) { }

  goToHistory() {
    this.navCtrl.parent.select(1);
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
    stats: {
      highStat: 0,
      highStatLabel: "",
      lowStat: 0,
      lowStatLabel: ""
    }
  }

  secondYear = {
    data: [1230000, 1130000, 30000, 930000, 830000, 730000, 630000, 530000, 430000, 330000, 1230000, 3330000],
    label: this.inputFinalYear,
    stats: {
      highStat: 0,
      highStatLabel: "",
      lowStat: 0,
      lowStatLabel: ""
    }
  }

  public getNameTitle(): String {
    switch (this.titulo) {
      case 'Velocidade do Vento':
        return 'wind_speed';
      case 'Tensão':
        return 'electric_voltage';
      case 'Corrente':
        return 'electric_current';
      case 'Máxima Potência':
        return 'mppt';
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
    console.log(this.titulo);
    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
    }
    this.turbineDataService.getTurbineDataByYear(
      this.inputInitYear.toString(),
      this.inputFinalYear.toString(),
      this.getNameTitle()
    ).retry(3).subscribe(
      (res) => {
        lineChartData[0].data = res.firstYear;
        lineChartData[1].data = res.secondYear;
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
      );
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public statsChart(year: any): any {
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
      highStat: highStat,
      highStatLabel: highStatLabel,
      lowStat: lowStat,
      lowStatLabel: lowStatLabel
    }
  }
}