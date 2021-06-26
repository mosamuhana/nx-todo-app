import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  /*
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
  */
}
