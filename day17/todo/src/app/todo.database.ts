import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo } from './models';

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

  async addTodo(t: Todo): Promise<any> {
    return await this.todo.put(t)
  }

}
