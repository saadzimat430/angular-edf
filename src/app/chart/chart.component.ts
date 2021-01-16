import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MarketResult } from '../common/market-result';
import { MarketRatesService } from '../services/market-rates.service';
import { countries } from '../../assets/countries';

@Component({
  selector: 'app-chart',
  template: `
    <div style="margin-top: 50px;" [chart]="chart"></div>
    <div style="display: flex; justify-content: center; margin-top: 50px;">
      <mat-form-field appearance="fill" style="width: 400px;">
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input [rangePicker]="picker">
          <input matStartDate placeholder="Start date" (dateChange)="updateStartDate($event)">
          <input matEndDate placeholder="End date" (dateChange)="updateEndDate($event)">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  marketArray = new Array<MarketResult>();
  chart: Chart;
  startDate: Date;
  endDate: Date;

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
            type: 'line',
            height: '600px'
          },
          title: {
            text: 'Market Rates'
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
          series: countries.map(x => JSON.parse(JSON.stringify(
            {
              name: x.country,
              type: 'line',
              data: this.marketArray.map(rate => rate[x.code]),
              pointStart: this.startDate != null ? this.startDate : Date.UTC(2016, 12, 4, 1),
              // 3600000 ms is 1 hour
              pointInterval: this.getTimeInterval() != null ? this.getTimeInterval() : 3600000
            }
          )))
        });
      },
      error => {
        console.log(error);
      }
    )

    console.log(this.getTimeInterval());

  }

  ngOnInit(): void {

  }

  updateStartDate(dateObject): void {
    if (!!dateObject.value) {
      this.startDate = dateObject.value;
    }
  }

  updateEndDate(dateObject): void {
    if (!!dateObject.value) {
      this.endDate = dateObject.value;
    }
  }

  getTimeInterval(): number {
    if (!!this.startDate && !!this.endDate) {
      return Math.abs(this.endDate.getTime() - this.startDate.getTime());
    } else {
      return null;
    }
  }

}
