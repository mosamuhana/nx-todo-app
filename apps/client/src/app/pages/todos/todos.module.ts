import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TodosPage } from './todos.page';
import { TodoInputComponent, TodoItemComponent, TodoListComponent } from './components';

const components = [
  TodoInputComponent,
  TodoItemComponent,
  TodoListComponent,
];

const materialComponents = [
  //MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
];

const routes: Routes = [
  { path: '', component: TodosPage },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ...materialComponents,
  ],
  declarations: [
    TodosPage,
    ...components,
  ],
})
export class TodosPageModule { }
