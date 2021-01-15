import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MarketResult } from '../common/market-result';
import { MarketRatesService } from '../services/market-rates.service';

@Component({
  selector: 'app-chart',
  template: `
    <!-- <button (click)="add()">Add Point!</button> -->
    <div [chart]="chart" style="height: 100%;"></div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  marketArray = new Array<MarketResult>();
  chart: Chart;

  constructor(private market: MarketRatesService) {
    this.market.getMarketRates().subscribe(
      data => {
        let csvToRowArray = data.split("\n");

        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          // JSON.parse to solve the problem of backslash and \"
          this.marketArray.push(new MarketResult(
            this.market.extractDate(JSON.parse(row[0])),
            +row[1],
            +row[2],
            +row[3],
            +row[4],
            +row[5],
            +row[6],
            +row[7],
            +row[8],
            +row[9]));
        }

        this.chart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Market Rates'
          },
          credits: {
            enabled: false
          },
          xAxis: [
            {
              type: 'datetime',
              labels: {
                format: '{value:%Y-%m-%d-%HH}',
                rotation: -45,
                align: 'center'
              }
            }
          ],
          series: [
            {
              name: 'Belgium',
              type: 'line',
              data: this.marketArray.map(rate => rate.be),
              pointStart: Date.UTC(2016, 12, 4, 1),
              // 3600000 ms is 1 hour
              pointInterval: 3600000
            },
            {
              name: 'Switzerland',
              type: 'line',
              data: this.marketArray.map(rate => rate.ch),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Czech',
              type: 'line',
              data: this.marketArray.map(rate => rate.cz),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Germany_Austria',
              type: 'line',
              data: this.marketArray.map(rate => rate.de_at),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Denmark 1',
              type: 'line',
              data: this.marketArray.map(rate => rate.dk1),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Denmark 2',
              type: 'line',
              data: this.marketArray.map(rate => rate.dk2),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Spain',
              type: 'line',
              data: this.marketArray.map(rate => rate.es),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'France',
              type: 'line',
              data: this.marketArray.map(rate => rate.fr),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            },
            {
              name: 'Netherlands',
              type: 'line',
              data: this.marketArray.map(rate => rate.nl),
              pointStart: Date.UTC(2016, 12, 4, 1),
              pointInterval: 3600000
            }
          ]
        });
      },
      error => {
        console.log(error);
      }
    )

  }

  ngOnInit(): void {

  }

}
