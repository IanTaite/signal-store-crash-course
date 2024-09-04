import { Component, inject, OnInit } from '@angular/core';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodosListComponent } from './components/todos-list/todos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatProgressSpinner,
    TodosListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos().then(() => console.log('Todos loaded'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
