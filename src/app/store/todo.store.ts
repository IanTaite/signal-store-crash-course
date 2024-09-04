import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../model/todo.model";
import { TodosService } from "../services/todos.service";
import { computed, inject } from "@angular/core";

export type TodosFilter = "all" | "pending" | "complete";

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all",
};

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    loadAll: async () => {
      patchState(store, { loading: true });
      const todos = await todosService.get();
      patchState(store, { todos, loading: false });
    },
    addTodo: async (title: string) => {
      const todo = await todosService.add({ title });
      patchState(store, (state: TodosState) => ({
        ...state,
        todos: [...state.todos, todo]
      }));
    },
    deleteTodo: async (id: string) => {
      await todosService.delete(id);
      patchState(store, (state: TodosState) => ({
        ...state,
        todos: state.todos.filter(t => t.id !== id)
      }));
    },
    updateTodo: async (id: string, complete: boolean) => {
      await todosService.update(id, complete);
      patchState(store, (state: TodosState) => ({
        todos: state.todos.map(t => t.id === id ? {...t, complete } : t)
      }));
    },
    updateFilter: (filter: TodosFilter) => {
      patchState(store, { filter });
    }
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      switch (state.filter()) {
        case "all":
          return state.todos();
        case "pending":
          return state.todos().filter(t => !t.complete);
        case "complete":
          return state.todos().filter(t => t.complete);
        default:
          return state.todos();
      }
    })
  })),
);
