import { ApplicationError } from "./application-error.js";

export class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super("A user with this email already exists", 409, "EMAIL_ALREADY_EXISTS");
  }
}
