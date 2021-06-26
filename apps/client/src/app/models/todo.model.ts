export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
  completed?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}
