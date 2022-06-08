import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseErrorError } from "./base-error.error";

export class BadRequestError extends BaseErrorError {
  constructor(description: string, name: string = ReasonPhrases.BAD_REQUEST) {
    super(name, StatusCodes.BAD_REQUEST, description, true);
  }
}
