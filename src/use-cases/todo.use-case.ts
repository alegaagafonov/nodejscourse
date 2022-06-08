import messages from "../config/messages";
import { DataService, NotFoundError, Status, Todo } from "../core";

export default class TodoUseCase {
  private readonly dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  public async create(todo: Todo): Promise<Todo> {
    try {
      const result = await this.dataService.todos.create(todo);
      this.checkExists(result);
      return result;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async get(id: unknown): Promise<Todo> {
    try {
      const result = await this.dataService.todos.get(id);
      this.checkExists(result);
      return result as Todo;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async remove(id: unknown): Promise<Todo> {
    try {
      const result = await this.dataService.todos.remove(id);
      this.checkExists(result);
      return result as Todo;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async update(id: string, todo: Todo): Promise<Todo> {
    try {
      const result = await this.dataService.todos.update(id, todo);
      this.checkExists(result);
      return result as Todo;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async complete(id: string, status: Status): Promise<Todo> {
    try {
      const result = await this.dataService.todos.update(id, status);
      this.checkExists(result);
      return result as Todo;
    } catch (error: unknown) {
      throw error;
    }
  }

  private checkExists(result: unknown): void {
    if (!result) {
      throw new NotFoundError(messages.validation.idNotFound);
    }
  }
}
