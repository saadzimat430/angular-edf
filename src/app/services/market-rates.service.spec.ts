import { TestBed } from '@angular/core/testing';

import { MarketRatesService } from './market-rates.service';

describe('MarketRatesService', () => {
  let service: MarketRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
