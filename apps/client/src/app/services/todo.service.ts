import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Todo, CreateTodoDto, UpdateTodoDto } from '../models';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todosSubject$ = new BehaviorSubject<Todo[]>([]);
  public readonly todos$: Observable<Todo[]> = this._todosSubject$.asObservable();

  constructor(
    private readonly http: HttpClient,
  ) {
    this.load();
  }

  public load() {
    this.http.get<Todo[]>('/api/todos').subscribe(todos => {
      this._todosSubject$.next(todos ?? []);
    });
  }

  public async add({ title }: CreateTodoDto): Promise<Todo> {
    return this.http.post<Todo>('/api/todos', { title }).pipe(
      finalize(() => this.load())
    ).toPromise();
  }

  public async update(id: number, input: UpdateTodoDto): Promise<Todo> {
    return this.http.put<Todo>(`/api/todos/${id}`, input).pipe(
      finalize(() => this.load())
    ).toPromise();
  }

  public async remove(id: number): Promise<Todo> {
    return this.http.delete<Todo>(`/api/todos/${id}`).pipe(
      finalize(() => this.load())
    ).toPromise();
  }
}
