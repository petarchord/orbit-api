import type { Request, Response } from "express";
import { UserRepository } from "../users/user.repository.js";
import { UnauthorizedError } from "../../errors/unauthorized-error.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();
const userRepository = new UserRepository();

export async function register(req: Request, res: Response) {
  const user = await authService.register(req.body);

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}

export async function login(req: Request, res: Response) {
  const { user, session } = await authService.login(req.body);
  res.cookie("session_token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: session.expiresAt,
    path: "/",
  });
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.session_token;
  if (token) {
    await authService.logout(token);
  }
  res.clearCookie("session_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.status(204).send();
}

export async function me(req: Request, res: Response) {
  const user = await authService.getCurrentUser(req.user?.id!);
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}
