import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseErrorError } from "./base-error.error";

export class NotFoundError extends BaseErrorError {
  constructor(description: string) {
    super(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, description, true);
  }
}
