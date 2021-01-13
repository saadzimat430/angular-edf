import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarketResult } from '../common/market-result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  x: string = "";
  marketArray = new Array<MarketResult>();

  constructor(private http: HttpClient) {
    this.http.get('assets/market.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            // JSON.parse to solve the problem of backslash and \"
            this.marketArray.push(new MarketResult(
              this.extractDate(JSON.parse(row[0])),
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
      );
  }

  ngOnInit(): void {

  }

  public extractDate(date: string) {
    return new Date(
      +date.split(" - ")[0].substring(0,4),
      +date.split(" - ")[0].substring(4,6) - 1,
      +date.split(" - ")[0].substring(6),
      +date.split(" - ")[1].substring(1)
    );
  }

}

