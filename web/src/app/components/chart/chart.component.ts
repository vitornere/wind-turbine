import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TurbineDataService } from './../../services/turbine-data.service';

const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';
import { TurbineDataModel } from '../../models/turbine-data.models';

Highcharts.setOptions({
  height: ['300px']
});

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vento') public chartEl1: ElementRef;
  @ViewChild('tensao') public chartEl2: ElementRef;
  @ViewChild('corrente') public chartEl3: ElementRef;
  @ViewChild('potencia') public chartEl4: ElementRef;

  private chartVento: any;
  private chartTensao: any;
  private chartCorrente: any;
  private chartPotencia: any;

  updateData: any;
  turbine_data: [number] = [
    0,
    0,
    0,
    0
  ];

  constructor(private turbineDataService: TurbineDataService) {
    const currentChart = this;
    this.updateData = this.setUpdateData(currentChart);
  }

  public ngAfterViewInit() {

    const legend: any = {
      enabled: false
    };

    const tooltip: any = {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.numberFormat(this.y, 2) + '<br/>' +
          Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x);
      }
    };

    const credits: any = {
      enabled: false
    };
    const title: any = {
      text: '',
    };
    const yAxis: any = {
      title: {
        enabled: false
      }
    };
    const xAxis: any = {
      type: 'datetime',
      tickPixelInterval: 150
    };

    const opts1: any = {
      credits,
      title,
      yAxis: {
        title: {
          text: 'Velocidade (M/S)'
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: 'Velocidade (M/S)',
        data: (function () {
          // generate an array of random data
          // tslint:disable-next-line:prefer-const
          let data = [],
            // tslint:disable-next-line:prefer-const
            time = (new Date()).getTime(), i;
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }())
      }]
    };

    const opts2: any = {
      credits,
      title,
      yAxis: {
        title: {
          text: 'Volts (V)'
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: 'Volts (V)',
        data: (function () {
          // generate an array of random data
          // tslint:disable-next-line:prefer-const
          let data = [],
            // tslint:disable-next-line:prefer-const
            time2 = (new Date()).getTime(), i;
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time2 + i * 1000,
              y: Math.floor(Math.random() * 120) + 0
            });
          }
          return data;
        }())
      }]
    };

    const opts3: any = {
      credits,
      title,
      yAxis: {
        title: {
          text: 'Ampere (A)'
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: 'Ampere (A)',
        data: (function () {
          // generate an array of random data
          // tslint:disable-next-line:prefer-const
          let data = [],
            // tslint:disable-next-line:prefer-const
            time2 = (new Date()).getTime(), i;
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time2 + i * 1000,
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }())
      }]
    };

    const opts4: any = {
      credits,
      title,
      yAxis: {
        title: {
          text: 'Watts (W)'
        }
      },
      xAxis,
      legend,
      tooltip,
      series: [{
        name: 'Watts (W)',
        data: (function () {
          // generate an array of random data
          // tslint:disable-next-line:prefer-const
          let data = [],
            // tslint:disable-next-line:prefer-const
            time2 = (new Date()).getTime(), i;
          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time2 + i * 1000,
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }())
      }]
    };

    const charOpt: any = [
      opts1,
      opts2,
      opts3,
      opts4
    ];

    if (this.chartEl1 && this.chartEl1.nativeElement) {
      charOpt[0].chart = {
        type: 'spline',
        renderTo: this.chartEl1.nativeElement,
        height: 300
      };

      this.chartVento = new Highcharts.Chart(charOpt[0]);
    }

    if (this.chartEl2 && this.chartEl2.nativeElement) {
      charOpt[1].chart = {
        type: 'spline',
        renderTo: this.chartEl2.nativeElement,
        height: 300
      };

      this.chartTensao = new Highcharts.Chart(charOpt[1]);
    }

    if (this.chartEl3 && this.chartEl3.nativeElement) {
      charOpt[2].chart = {
        type: 'spline',
        renderTo: this.chartEl3.nativeElement,
        height: 300
      };

      this.chartCorrente = new Highcharts.Chart(charOpt[2]);
    }

    if (this.chartEl4 && this.chartEl4.nativeElement) {
      charOpt[3].chart = {
        type: 'spline',
        renderTo: this.chartEl4.nativeElement,
        height: 300
      };

      this.chartPotencia = new Highcharts.Chart(charOpt[3]);
    }
  }

  public ngOnDestroy() {
    this.chartVento.destroy();
    this.chartTensao.destroy();
    this.chartCorrente.destroy();
    this.chartPotencia.destroy();
  }

  private randomValue() {
    return Math.floor(Math.random() * 10) + 0;
  }

  private randomValueTension() {
    return Math.floor(Math.random() * 10) + 0;
  }

  setUpdateData(currentChart) {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData()
        .subscribe(
        res => {
          currentChart.turbine_data[0] = +res.wind_speed;
          currentChart.turbine_data[1] = +res.electric_voltage;
          currentChart.turbine_data[2] = +res.electric_current;
          currentChart.turbine_data[3] = +res.mppt;
        }
        );
    }, 1000);

    setInterval(function () {
      if (currentChart.chartVento !== undefined && currentChart.chartVento['series'] !== undefined) {
        currentChart.chartVento['series'][0].addPoint([(new Date()).getTime(), currentChart.turbine_data[0]], true, true);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartTensao !== undefined && currentChart.chartTensao['series'] !== undefined) {
        currentChart.chartTensao['series'][0].addPoint([(new Date()).getTime(), currentChart.turbine_data[1]], true, true);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartCorrente !== undefined && currentChart.chartCorrente['series'] !== undefined) {
        currentChart.chartCorrente['series'][0].addPoint([(new Date()).getTime(), currentChart.turbine_data[2]], true, true);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartPotencia !== undefined && currentChart.chartPotencia['series'] !== undefined) {
        currentChart.chartPotencia['series'][0].addPoint([(new Date()).getTime(), currentChart.turbine_data[3]], true, true);
      }
    }, 1000);
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: string, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }
}
