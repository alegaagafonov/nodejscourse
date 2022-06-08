import { Status, Todo } from "../core";
import {
  CompleteTodoDto,
  CreateTodoDto,
  CreateTodoResponseDto,
  RemoveTodoResponseDto,
  TodoResponseDto,
  UpdateTodoDto,
  UpdateTodoResponseDto,
} from "../core/dtos";

export class TodoFactoryService {
  createTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo = new Todo();
    newTodo.label = createTodoDto.label;
    newTodo.done = createTodoDto?.done || false;

    return newTodo;
  }

  updateTodo(updateTodoDto: UpdateTodoDto): Todo {
    const newTodo = new Todo();
    newTodo.label = updateTodoDto.label;
    if (updateTodoDto.done != null) {
      newTodo.done = updateTodoDto.done;
    }

    return newTodo;
  }

  completeTodo(completeTodoDto: CompleteTodoDto): Status {
    const newStatus = new Status();
    newStatus.done = completeTodoDto.done;

    return newStatus;
  }

  getTodoResponse(createdTodo: Todo): TodoResponseDto {
    const todoResponseDto = new TodoResponseDto();
    todoResponseDto.id = createdTodo.id;
    todoResponseDto.label = createdTodo.label;
    todoResponseDto.done = createdTodo.done;

    return todoResponseDto;
  }

  createTodoResponse(createdTodo: Todo): CreateTodoResponseDto {
    const todoResponseDto = new CreateTodoResponseDto();
    todoResponseDto.id = createdTodo.id;
    todoResponseDto.label = createdTodo.label;
    todoResponseDto.done = createdTodo.done;

    return todoResponseDto;
  }

  updateTodoResponse(createdTodo: Todo): UpdateTodoResponseDto {
    const todoResponseDto = new UpdateTodoResponseDto();
    todoResponseDto.id = createdTodo.id;
    todoResponseDto.label = createdTodo.label;
    todoResponseDto.done = createdTodo.done;

    return todoResponseDto;
  }

  completeTodoResponse(createdTodo: Todo): UpdateTodoResponseDto {
    const todoResponseDto = new UpdateTodoResponseDto();
    todoResponseDto.id = createdTodo.id;
    todoResponseDto.label = createdTodo.label;
    todoResponseDto.done = createdTodo.done;

    return todoResponseDto;
  }

  removeTodoResponse(createdTodo: Todo): RemoveTodoResponseDto {
    const todoResponseDto = new RemoveTodoResponseDto();
    todoResponseDto.id = createdTodo.id;
    todoResponseDto.label = createdTodo.label;
    todoResponseDto.done = createdTodo.done;

    return todoResponseDto;
  }
}
