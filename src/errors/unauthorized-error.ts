import { ApplicationError } from "./application-error.js";

export class UnauthorizedError extends ApplicationError {
  constructor() {
    super("Authentication required", 401, "UNAUTHORIZED");
  }
}
