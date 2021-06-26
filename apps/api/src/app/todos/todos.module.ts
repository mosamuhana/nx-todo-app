import { Module } from '@nestjs/common';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from '../services';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule {}
