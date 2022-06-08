import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import messages from "../config/messages";

function idIsPresent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  if (req.params?.id) {
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST).send(messages.validation.idNotProvided);
  }
}

function bodyIsPresent(req: Request, res: Response, next: NextFunction) {
  const isValid =
    req?.body &&
    typeof req.body === "object" &&
    Object.keys(req.body).length > 0;

  if (isValid) {
    next();
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(messages.validation.bodyNotProvided);
  }
}

export { idIsPresent, bodyIsPresent };
