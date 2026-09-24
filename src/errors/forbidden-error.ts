import { ApplicationError } from "./application-error.js";

export class ForbiddenError extends ApplicationError {
  constructor() {
    super(
      "You do not have permission to perform this action",
      403,
      "FORBIDDEN",
    );
  }
}
