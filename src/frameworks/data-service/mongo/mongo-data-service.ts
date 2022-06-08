import { Model } from "mongoose";
import { DataService, Todo } from "../../../core";
import { MongoRepository } from "./mongo-repository";

export class MongoDataService extends DataService {
  readonly todos: MongoRepository<Todo>;
  protected readonly TodoRepository: Model<Todo>;

  constructor(model: Model<Todo>) {
    super();
    this.TodoRepository = model;
    this.todos = new MongoRepository<Todo>(model);
  }
}
