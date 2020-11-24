import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('myTodo')
  todoRef: TodoComponent

  constructor(private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void { }

  async addTodo() {
    // Generate a new id for todo
    const id = uuidv4().toString().substring(0, 8)
    // Get the new todo from the form
    const todo = this.todoRef.todo;
    // set the new id to the new todo
    todo.id = id;

    // Save this to the database
    await this.todoDB.addTodo(todo)

    // navigate to /
    this.router.navigate(['/'])
  }

}
