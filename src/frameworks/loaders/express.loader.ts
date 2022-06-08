import express, {
  json,
  NextFunction,
  Request,
  Response,
  Router,
  urlencoded,
} from "express";
import config from "../../config";
import TodoController from "../../controllers/todo.controller";
import {
  bodyIsPresent,
  handleError,
  idIsPresent,
  isTrustedError,
} from "../../middlewares";

export class ExpressLoader {
  constructor(controller: TodoController) {
    const router = Router();
    this.init(router, controller);
  }

  public static errorHandler(
    err: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
  ) {
    if (!isTrustedError(err)) {
      next(err);
    }
    handleError(err);
  }

  private init(router: Router, controller: TodoController) {
    router.get("/:id", idIsPresent, controller.get.bind(controller));

    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore noOverloadMatchesThisCall
    router.post("/create", bodyIsPresent, controller.create.bind(controller));

    router.put(
      "/update/:id",
      idIsPresent,
      bodyIsPresent,
      controller.update.bind(controller)
    );

    router.delete(
      "/delete/:id",
      idIsPresent,
      controller.remove.bind(controller)
    );

    router.put(
      "/complete/:id",
      idIsPresent,
      bodyIsPresent,
      controller.complete.bind(controller)
    );

    const app = express();

    app.use(urlencoded({ extended: false }));
    app.use(json({ type: "application/json" }));
    app.use(router);
    app.use(ExpressLoader.errorHandler);

    app.listen(config.port, () => {
      console.log(`Express is listening on port ${config.port}`);
    });
  }
}
