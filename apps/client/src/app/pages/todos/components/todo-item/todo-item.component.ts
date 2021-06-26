import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Todo } from '../../../../models';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() removeTodo = new EventEmitter<Todo>();
  @Output() toggleTodo = new EventEmitter<Todo>();

  removeItem() {
    this.removeTodo.emit(this.todo);
  }

  toggleItem(completed: boolean) {
    this.toggleTodo.emit({ ...this.todo, completed, });
  }
}
