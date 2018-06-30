import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos = [
    { text: 'Implement login page' },
    { text: 'Add a way to enter new trades' },
    { text: 'Replace PHP back-end with Python' },
    { text: 'Add a footer', done: true },
    { text: 'Create base card structure', done: true },
    { text: 'Create base navbar structure', done: true },
    { text: 'Create base routine structure', done: true },
    { text: 'Replace PostgreSQL database with MongoDB' },
    { text: 'HOME: Calculate daily change as percentage for display' },
    { text: 'HOME: Add chart.js charts to each card' },
    { text: 'HOME: Pipe all numeric figures to maintain exact number of decimal places' },
    { text: 'ALL-TRADES: Calculate daily change as percentage for display' },
    { text: 'ALL-TRADES: Pipe all numeric figures to maintain exact number of decimal places' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
