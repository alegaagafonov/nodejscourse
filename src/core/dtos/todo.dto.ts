export class TodoDto {
  label = "";
  done?: boolean;
}

export class CreateTodoDto extends TodoDto {}

export class UpdateTodoDto extends TodoDto {}

export class CompleteTodoDto {
  done = false;
}
