import { Component, OnInit } from '@angular/core';
import { TodoSummary } from '../models';
import { TodoDatabase } from '../todo.database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  todos: TodoSummary[] = []

  constructor(private todoDB: TodoDatabase) { }

  ngOnInit(): void {
    this.todoDB.getTodoSummary()
      .then(result => {
        this.todos = result;
        console.info('>>> summary: ', result)
      })
  }

}
