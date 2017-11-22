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

  turbine_data_time: Date;

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

    const data: any = (function () {

      let data = [],
          // tslint:disable-next-line:prefer-const
          time = new Date().getTime();
      for (let i = 0; i <= 15; i ++) {
          data.push({
              x: time,
              y: 0
          });
      }
      return data;
    }());

    const name: [string] = [
      'Velocidade (M/S)',
      'Volts (V)',
      'Ampere (A)',
      'Watts (W)',
    ];

    const opts1: any = {
      credits,
      title,
      yAxis: {
        title: {
            text: name[0]
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: name[0],
        data,
      }],
    };

    const opts2: any = {
      credits,
      title,
      yAxis: {
        title: {
            text: name[1]
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: name[1],
        data,
      }],
    };

    const opts3: any = {
      credits,
      title,
      yAxis: {
        title: {
            text: name[2]
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: name[2],
        data,
      }],
    };

    const opts4: any = {
      credits,
      title,
      yAxis: {
        title: {
            text: name[3]
        }
      },
      xAxis,
      tooltip,
      legend,
      series: [{
        name: name[3],
        data,
        allowPointSelect: true
      }],
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

  setUpdateData(currentChart) {
    setInterval(() => {
      this.turbineDataService.getLastTurbineData()
        .subscribe(
        res => {
          currentChart.turbine_data[0] = +res.wind_speed;
          currentChart.turbine_data[1] = +res.electric_voltage;
          currentChart.turbine_data[2] = +res.electric_current;
          currentChart.turbine_data[3] = +res.mppt;
          currentChart.turbine_data_time = new Date(res.date).getTime();
          console.log(currentChart.turbine_data_time + ' - ' + currentChart.turbine_data[0]);
        }
        );
    }, 1000);

    setInterval(function () {
      if (currentChart.chartVento) {
        currentChart.chartVento['series'][0].addPoint([currentChart.turbine_data_time, currentChart.turbine_data[0]], true, true);
        console.log(currentChart.turbine_data_time + ' - ' + currentChart.turbine_data[0]);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartTensao) {
        currentChart.chartTensao['series'][0].addPoint([currentChart.turbine_data_time, currentChart.turbine_data[1]], true, true);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartCorrente) {
        currentChart.chartCorrente['series'][0].addPoint([currentChart.turbine_data_time, currentChart.turbine_data[2]], true, true);
      }
    }, 1000);
    setInterval(function () {
      if (currentChart.chartPotencia) {
        currentChart.chartPotencia['series'][0].addPoint([currentChart.turbine_data_time, currentChart.turbine_data[3]], true, true);
      }
    }, 1000);
  }

  newTurbineDataObject(id: number, image_src: string, title: string, subtitle: string, unity: string) {
    return new TurbineDataModel(id, image_src, title, subtitle, unity);
  }
}
