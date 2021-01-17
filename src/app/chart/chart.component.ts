import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MarketResult } from '../common/market-result';
import { MarketRatesService } from '../services/market-rates.service';
import { countries } from '../../assets/countries';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  marketArray = new Array<MarketResult>();
  chart: Chart;
  startDate: Date;
  endDate: Date;
  date = new Date(Date.UTC(2017, 11, 4));

  constructor(private market: MarketRatesService) {
    this.market.getMarketRates().subscribe(
      data => {
        let csvToRowArray = data.split("\n");

        for (let index = 1; index < csvToRowArray.length; index++) {
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

        if (!!window.localStorage.getItem('end-date')) {
          this.marketArray = this.marketArray.filter(
            rate => rate.dates.toISOString() < window.localStorage.getItem('end-date')
          );
        }

        // console.log(this.marketArray);

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
              pointStart: !!localStorage.getItem('start-date') ? new Date(localStorage.getItem('start-date')).getTime() : Date.UTC(2017, 11, 4, 1),
              // 3600000 ms is 1 hour
              pointInterval: 3600000
            }
          )))
        });
      },
      error => {
        console.log(error);
      }

    )
    
  }

  ngOnInit(): void {
    // console.log(this.marketArray);
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

  updateDates(): void {
    window.localStorage.setItem('start-date', this.startDate.toISOString());
    window.localStorage.setItem('end-date', this.endDate.toISOString());
    window.localStorage.setItem('interval', this.getTimeInterval().toString());
    window.location.reload();
  }

  resetDates(): void {
    localStorage.clear();
    window.location.reload();
  }

}
