import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseErrorError } from "./base-error.error";

export class APIError extends BaseErrorError {
  constructor(
    description: string,
    name: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(name, StatusCodes.INTERNAL_SERVER_ERROR, description, isOperational);
  }
}
