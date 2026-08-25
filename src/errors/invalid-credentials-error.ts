import { ApplicationError } from "./application-error.js";

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }
}
