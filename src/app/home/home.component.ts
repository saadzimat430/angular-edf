import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as papa from "papaparse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  x: string = "";

  constructor(private http: HttpClient) {
    this.http.get('assets/market.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          /* for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.userArray.push(new User( parseInt( row[0], 10), row[1], row[2].trim()));
          } */
          console.log(csvToRowArray);
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {

  }

}

