import { BaseErrorError } from "../core";

function handleError(error: Error): void {
  console.log(`Error message from ErrorHandler: ${error}`);
}

function isTrustedError(error: Error): boolean {
  if (error instanceof BaseErrorError) {
    return error.isOperational;
  }
  return false;
}

export { isTrustedError, handleError };
