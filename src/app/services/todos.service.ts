import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  async get() {
    await this.sleep(2000);
    return TODOS;
  }

  async add(todo: Partial<Todo>) {
    await this.sleep(2000);
    return {
      ...todo,
      id: String(Math.random() * 1000000),
      complete: false
    } as Todo;
  }

  async delete(id: string) {
    await this.sleep(2000);
  }

  async update(id: string, complete: boolean) {
    await this.sleep(2000);
  }

  async sleep(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor() { }
}
