import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';

Highcharts.setOptions({
  height: ['300px']
});

@Component({
  selector: 'app-chart',
  template: `<div><div #chart></div></div>`,
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

  public ngAfterViewInit() {

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
      yAxis,
      xAxis,
      series: [{
        name: 'Velocidade por segundo',
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
      yAxis,
      xAxis,
      series: [{
        name: 'Voltagem por segundo',
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
      yAxis,
      xAxis,
      series: [{
        name: 'Corrente por segundo',
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
      yAxis,
      xAxis,
      series: [{
        name: 'Potência por segundo',
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

  constructor() {
    const currentChart = this;

    setInterval(function () {
      if (currentChart.chartVento) {
        currentChart.chartVento['series'][0].addPoint([(new Date()).getTime(), currentChart.randomValue()], true, true);
      }
    }, 2000);
    setInterval(function () {
      if (currentChart.chartTensao) {
        currentChart.chartTensao['series'][0].addPoint([(new Date()).getTime(), currentChart.randomValueTension()], true, true);
      }
    }, 2000);
    setInterval(function () {
      if (currentChart.chartCorrente) {
        currentChart.chartCorrente['series'][0].addPoint([(new Date()).getTime(), currentChart.randomValue()], true, true);
      }
    }, 2000);
    setInterval(function () {
      if (currentChart.chartPotencia) {
        currentChart.chartPotencia['series'][0].addPoint([(new Date()).getTime(), currentChart.randomValue()], true, true);
      }
    }, 2000);
  }
}
