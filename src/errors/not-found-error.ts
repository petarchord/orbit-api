import { ApplicationError } from "./application-error.js";

export class NotFoundError extends ApplicationError {
  constructor() {
    super("The requested resource was not found", 404, "NOT_FOUND");
  }
}
