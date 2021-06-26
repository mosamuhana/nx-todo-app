import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Todo } from '@prisma/client';

import { IntParam } from '../common/decorators';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todoService: TodosService,
  ) {}

  @Get(':id')
  async getOne(@IntParam('id') id: number): Promise<Todo> {
    return this.todoService.getOne({ id });
  }

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todoService.getAll();
  }

  @Post()
  async create(@Body() input: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(input.title);
  }

  @Put(':id')
  async update(@IntParam('id') id: number, @Body() input: UpdateTodoDto): Promise<Todo> {
    return await this.todoService.update(id, input);
  }

  @Delete(':id')
  async remove(@IntParam('id') id: number): Promise<Todo> {
    return await this.todoService.remove(id);
  }
}
