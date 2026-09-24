import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { SessionService } from "../modules/session/session.service.js";

const sessionService = new SessionService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.session_token;
  if (!token) {
    throw new UnauthorizedError();
  }
  const session = await sessionService.findValidSession(token);
  if (!session) {
    throw new UnauthorizedError();
  }
  req.user = {
    id: session.userId,
    role: session.user.role,
  };
  next();
}
