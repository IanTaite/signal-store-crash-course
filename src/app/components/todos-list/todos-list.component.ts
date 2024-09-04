import { Component, effect, inject, viewChild } from '@angular/core';
import { JsonPipe, NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  MatButtonToggleGroup,
  MatButtonToggle,
  MatButtonToggleChange,
} from '@angular/material/button-toggle';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { TodosFilter, TodosStore } from '../../store/todo.store';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    NgStyle,
    JsonPipe,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatListOption,
    MatSelectionList,
    MatSuffix,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, $event: MouseEvent) {
    $event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onToggleTodo(id: string, complete: boolean) {
    await this.store.updateTodo(id, complete);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }
}
