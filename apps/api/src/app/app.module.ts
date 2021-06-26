import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TodosModule } from './todos';

@Module({
  imports: [
    TodosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
