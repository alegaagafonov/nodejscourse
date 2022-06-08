import { CreateTodoDto } from "./todo.dto";

export class TodoResponseDto extends CreateTodoDto {
  done = false;
  id = "";
}

export class CreateTodoResponseDto extends TodoResponseDto {}

export class UpdateTodoResponseDto extends TodoResponseDto {}

export class CompleteTodoResponseDto extends TodoResponseDto {}

export class RemoveTodoResponseDto extends TodoResponseDto {}
