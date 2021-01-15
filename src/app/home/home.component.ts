import { Component, OnInit } from '@angular/core';
import { MarketResult } from '../common/market-result';
import { MarketRatesService } from '../services/market-rates.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marketArray = new Array<MarketResult>();

  constructor(private market: MarketRatesService) {
    market.getMarketRates().subscribe(
      data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          // JSON.parse to solve the problem of backslash and \"
          this.marketArray.push(new MarketResult(
            market.extractDate(JSON.parse(row[0])),
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
        // console.log(JSON.stringify(this.marketArray[0]));
        // console.log(this.marketArray[0].dates);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {

  }

}

