import {
  Param,
  ParseIntPipe,
} from '@nestjs/common';

export const IntParam = (name: string) => Param(name, ParseIntPipe);
