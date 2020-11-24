import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  tasksArray: FormArray;
  titleCtrl: FormControl;

  get todo(): Todo {
    return this.todoForm.value as Todo
  }
  set todo(t: Todo) {
    // leave it
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createTodo()
    this.tasksArray = this.todoForm.get('tasks') as FormArray
    this.titleCtrl = this.todoForm.get('title') as FormControl
  }

  addTask() {
    const task = this.createTask()
    this.tasksArray.push(task)
  }

  deleteTask(idx: number) {
    this.tasksArray.removeAt(idx)
  }

  showValues() {
    console.info('form values: ', this.todoForm.value)
  }

  private createTodo(): FormGroup {
    return this.fb.group({
      title: this.fb.control('', [ Validators.required ]),
      tasks: this.fb.array([])
    })
  }

  private createTask(): FormGroup {
    return this.fb.group({
      description: this.fb.control('', [ Validators.required ]),
      priority: this.fb.control(0)
    })
  }

}
