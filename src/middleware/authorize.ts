import type { Request, Response, NextFunction } from "express";

import { ForbiddenError } from "../errors/forbidden-error.js";
import type { Role } from "../generated/prisma/client.js";

export function authorize(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenError();
    }
    next();
  };
}
