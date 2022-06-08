import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CompleteTodoDto,
  CompleteTodoResponseDto,
  CreateTodoDto,
  CreateTodoResponseDto,
  RemoveTodoResponseDto,
  TodoResponseDto,
  UpdateTodoDto,
  UpdateTodoResponseDto,
} from "../core/dtos";
import { TodoFactoryService } from "../use-cases";
import TodoUseCase from "../use-cases/todo.use-case";

export default class TodoController {
  private readonly todoUseCases: TodoUseCase;
  private readonly todoFactoryService: TodoFactoryService;

  constructor(
    todoUseCases: TodoUseCase,
    todoFactoryService: TodoFactoryService
  ) {
    this.todoUseCases = todoUseCases;
    this.todoFactoryService = todoFactoryService;
  }

  public async create(
    req: Request<undefined, CreateTodoDto>,
    res: Response<CreateTodoResponseDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const todo = this.todoFactoryService.createTodo(req.body);
      const createdTodo = await this.todoUseCases.create(todo);
      const createTodoResponse =
        this.todoFactoryService.createTodoResponse(createdTodo);
      res.send(createTodoResponse).status(StatusCodes.CREATED);
    } catch (error: unknown) {
      next(error);
    }
  }

  public async get(
    req: Request<{ id: string }>,
    res: Response<TodoResponseDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await this.todoUseCases.get(id);
      const todoResponse = this.todoFactoryService.getTodoResponse(todo);
      res.send(todoResponse).status(StatusCodes.CREATED);
    } catch (error: unknown) {
      next(error);
    }
  }

  public async remove(
    req: Request<{ id: string }>,
    res: Response<RemoveTodoResponseDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const removedTodo = await this.todoUseCases.remove(id);
      const removeTodoResponse =
        this.todoFactoryService.removeTodoResponse(removedTodo);
      res.json(removeTodoResponse).status(StatusCodes.OK);
    } catch (error: unknown) {
      next(error);
    }
  }

  public async update(
    req: Request<{ id: string }, UpdateTodoDto>,
    res: Response<UpdateTodoResponseDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const todo = this.todoFactoryService.updateTodo(req.body);
      const updatedTodo = await this.todoUseCases.update(id, todo);
      const updatedTodoResponse =
        this.todoFactoryService.updateTodoResponse(updatedTodo);
      res.json(updatedTodoResponse).status(StatusCodes.OK);
    } catch (error: unknown) {
      next(error);
    }
  }

  public async complete(
    req: Request<{ id: string }, CompleteTodoDto>,
    res: Response<CompleteTodoResponseDto>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const todo = this.todoFactoryService.completeTodo(req.body);
      const completedTodo = await this.todoUseCases.complete(id, todo);
      const completedTodoResponse =
        this.todoFactoryService.completeTodoResponse(completedTodo);
      res.json(completedTodoResponse).status(StatusCodes.OK);
    } catch (error: unknown) {
      next(error);
    }
  }
}
