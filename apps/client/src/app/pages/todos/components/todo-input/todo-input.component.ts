import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements AfterContentInit {
  title = new FormControl('', [ Validators.required, Validators.minLength(3) ]);
  form = new FormGroup({
    title: this.title,
  });

  @Output() save = new EventEmitter<string>();
  @ViewChild('titleInput') titleInput!: MatInput;

  get titleError() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }
    return this.title.hasError('minlength') ? 'Minimum 3 characters' : '';
  }

  ngAfterContentInit() {
    setTimeout(() => this.titleInput?.focus(), 0);
  }

  public async submit() {
    if (this.form.invalid) return;
    const title: string = this.title.value;
    this.form.reset();
    this.titleInput?.focus();
    this.save.emit(title);
  }
}
