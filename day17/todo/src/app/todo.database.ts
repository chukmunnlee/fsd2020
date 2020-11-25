import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo, TodoSummary } from './models';

@Injectable()
export class TodoDatabase extends Dexie {

  private todo: Dexie.Table<Todo, string>;

  constructor() {
    // database name
    super('tododb')

    // setup the schema for v1
    this.version(1).stores({
      todo: "id"
    })

    // get a reference to the todo collection
    this.todo = this.table('todo')
  }

  async getTodoSummary(): Promise<TodoSummary[]> {
    return (await this.todo.toArray())
      .map(d => {
        return {
          id: d.id,
          title: d.title
        } as TodoSummary
      })
  }

  async addTodo(t: Todo): Promise<any> {
    return await this.todo.put(t)
  }

}
