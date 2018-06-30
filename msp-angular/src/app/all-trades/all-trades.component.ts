import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-trades',
  templateUrl: './all-trades.component.html',
  styleUrls: ['./all-trades.component.scss']
})
export class AllTradesComponent implements OnInit {
  todaysReturn = '34.39';
  totalReturn = '2009.27';
  totalEquity = '9341.28';

  stocks = [
    {
      symbol_info: {
        symbol: 'AIEQ',
        name: 'AI Powered Equity',
        broker: 'Robinhood',
      },
      shares: '7.0000',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol_info: {
        symbol: 'FDIS',
        name: 'Fidelity MSCI Consumer Discretionary ETF',
        broker: 'Robinhood',
      },
      shares: '4.0000',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol_info: {
        symbol: 'FIS',
        name: 'Fidelity National Information Services, Inc.',
        broker: 'Fidelity',
      },
      shares: '52.9800',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol_info: {
        symbol: 'VPU',
        name: 'Vanguard Utilities ETF',
        broker: 'Robinhood',
      },
      shares: '2.0000',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '-1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol_info: {
        symbol: 'XLK',
        name: 'Technology Select Sector SPDR',
        broker: 'Robinhood',
      },
      shares: '3.0000',
      price: '69.48',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
