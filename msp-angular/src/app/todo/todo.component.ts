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
    { text: 'Add chart.js charts to each card' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
