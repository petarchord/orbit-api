import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export async function register(req: Request, res: Response) {
  const user = await authService.register(req.body);

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}
