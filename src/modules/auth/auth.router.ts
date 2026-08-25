import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validateBody } from "../../middleware/validate-body.js";
import { registerSchema, loginSchema } from "./auth.schema.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
