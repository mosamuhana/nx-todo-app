import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getOne(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where });
  }

  async getAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async create(title: string): Promise<Todo> {
    return this.prisma.todo.create({ data: { title, completed: false } });
  }

  async _update(params: { where: Prisma.TodoWhereUniqueInput; data: Prisma.TodoUpdateInput; }): Promise<Todo> {
    const { where, data } = params;
    return this.prisma.todo.update({ data, where });
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id } });
  }
}
