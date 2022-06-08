import mongoose from "mongoose";
import config from "./config/index";
import TodoController from "./controllers/todo.controller";
import { TodoSchema } from "./frameworks/data-service/mongo/models";
import { MongoDataService } from "./frameworks/data-service/mongo/mongo-data-service";
import { ExpressLoader } from "./frameworks/loaders/express.loader";
import { TodoFactoryService } from "./use-cases";
import TodoUseCase from "./use-cases/todo.use-case";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.dbUrl)
  .then(() => {
    console.log("Successfully connected to the dataServices");
    new ExpressLoader(
      new TodoController(
        new TodoUseCase(new MongoDataService(TodoSchema)),
        new TodoFactoryService()
      )
    );
  })
  .catch((error: unknown) => {
    console.log("Could not connect to the dataServices.", error);
    process.exit();
  });
