import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todaysReturn = '150.00';
  totalReturn = '1500.00';
  totalEquity = '9000.00';

  stocks = [
    {
      symbol: 'AIEQ',
      shares: '7.0000',
      name: 'AI Powered Equity',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol: 'FDIS',
      shares: '4.0000',
      name: 'Fidelity MSCI Consumer Discretionary ETF',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol: 'FIS',
      shares: '52.9800',
      name: 'Fidelity National Information Services, Inc.',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol: 'VPU',
      shares: '2.0000',
      name: 'Vanguard Utilities ETF',
      price: '27.92',
      todaysChange: '0.12',
      todaysReturn: '-1.04',
      equityValue: '111.68',
      totalReturn: '2.20',
    },
    {
      symbol: 'XLK',
      shares: '3.0000',
      name: 'Technology Select Sector SPDR',
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
