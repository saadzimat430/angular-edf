import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketResult } from '../common/market-result';

@Injectable({
  providedIn: 'root'
})
export class MarketRatesService {
  marketArray = new Array<MarketResult>();

  constructor(private http: HttpClient) { }

  getMarketRates(): Observable<string> {
    return this.http.get('assets/market.csv', { responseType: 'text' });
  }

  public extractDate(date: string) {
    return new Date(
      +date.split(" - ")[0].substring(0, 4),
      +date.split(" - ")[0].substring(4, 6) - 1,
      +date.split(" - ")[0].substring(6),
      +date.split(" - ")[1].substring(1)
    );
  }
}
