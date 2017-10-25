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
  @ViewChild('chart') public chartEl: ElementRef;

  private _chart: any;

  private randomValue() {
    return Math.floor(Math.random() * 10) + 0;
  }

  public ngAfterViewInit() {
    const opts: any = {
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      series: [{
        name: 'Random data',
        data: (function () {
          // generate an array of random data
          let data = [];
          let time = (new Date()).getTime(), i;
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

    if (this.chartEl && this.chartEl.nativeElement) {
      opts.chart = {
        type: 'spline',
        renderTo: this.chartEl.nativeElement,
        height: 300
      };

      this._chart = new Highcharts.Chart(opts);
    }
  }

  public ngOnDestroy() {
    this._chart.destroy();
  }

  constructor() {
    const me = this;

    setInterval(function () {
      if (me._chart) {
        me._chart['series'][0].addPoint([(new Date()).getTime(), me.randomValue()], true, true);
      }
    }, 2000);
  }
}