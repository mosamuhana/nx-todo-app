import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Todo, CreateTodoDto, UpdateTodoDto } from '../models';
import { StorageService } from './storage.service';

const STORE_KEY = 'TODOS';
const dummyData: Todo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: false },
  { id: 3, title: 'Todo 3', completed: false },
];

@Injectable({ providedIn: 'root' })
export class LocalTodoService {
  private _todosSubject$ = new BehaviorSubject<Todo[]>([]);
  public readonly todos$: Observable<Todo[]> = this._todosSubject$.asObservable();
  private todos: Todo[] = [];
  private lastId = 0;

  constructor(private readonly storageService: StorageService) {
    this.load();
  }

  public async load() {
    let dataFound = true;
    let items = await this.storageService.getJson<Todo[]>(STORE_KEY);
    if (items == null) {
      items = dummyData;
      dataFound = false;
    }
    this.lastId = Math.max(...items.map(x => x.id));
    this.todos = items;
    await this._updateAll(!dataFound)
  }

  public async save() {
    await this.storageService.setJson<Todo[]>(STORE_KEY, this.todos);
  }

  public async add(input: CreateTodoDto): Promise<Todo> {
    const todo: Todo = {
      title: input.title,
      id: ++this.lastId,
      completed: input.completed ?? false,
    };
    this.todos.push(todo);
    await this._updateAll();
    return todo;
  }

  public async update(input: UpdateTodoDto): Promise<Todo> {
    //await delay(5000);
    const index = this.todos.findIndex(x => x.id == input.id);
    if (index === -1) throw new Error('Not Found');
    if (typeof input.title !== 'undefined') this.todos[index].title = input.title;
    if (typeof input.completed !== 'undefined') this.todos[index].completed = input.completed;
    await this._updateAll();
    return this.todos[index];
  }

  public async remove(id: number): Promise<boolean> {
    const index = this.todos.findIndex(x => x.id == id);
    if (index === -1) {
      throw new Error('Not Found');
    }
    this.todos.splice(index, 1);
    await this._updateAll();
    return true;
  }

  private async _updateAll(save: boolean = true) {
    if (save) {
      await this.storageService.setJson<Todo[]>(STORE_KEY, this.todos);
    }
    this._todosSubject$.next(this.todos);
  }
}
