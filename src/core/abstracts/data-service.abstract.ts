import { Todo } from "../entities";
import { Repository } from "./repository.abstract";

export abstract class DataService {
  abstract todos: Repository<Todo>;
}
