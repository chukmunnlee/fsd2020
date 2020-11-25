import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todoId = ''

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
  }

}
