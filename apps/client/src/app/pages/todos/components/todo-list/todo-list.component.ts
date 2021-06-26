import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../../../../models';

import { TodoService } from '../../../../services';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  busy: boolean = false;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  async onRemove(todo: Todo) {
    try {
      this.busy = true;
      await this.todoService.remove(todo.id);
    } catch (ex) {
    } finally {
      this.busy = false;
    }
  }

  async onToggle(todo: Todo) {
    try {
      this.busy = true;
      const { id, completed } = todo;
      await this.todoService.update(id, { completed });
    } catch (ex) {
    } finally {
      this.busy = false;
    }
  }

  async onSave(title: string) {
    try {
      this.busy = true;
      await this.todoService.add({ title });
    } catch (ex) {
    } finally {
      this.busy = false;
    }
  }
}
