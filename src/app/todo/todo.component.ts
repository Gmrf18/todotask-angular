import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TodoItemComponent } from './todo-item/todo-item.component'
import { Todo } from './todo.model'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, /*FormsModule,*/ TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private todos = signal<Todo[]>([]);

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  allTodos = computed(() => this.todos());

  addTodo() {
    if (this.newTodo.valid) {
      const title = this.newTodo.value;
      this.todos.update((todos) => [
        ...todos,
        { id: Date.now(), title, completed: false },
      ]);
      this.newTodo.reset();
    }
  }

  removeTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
}
