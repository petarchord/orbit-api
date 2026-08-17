import { Router } from "express";
import { register } from "./auth.controller.js";
import { validateBody } from "../../middleware/validate-body.js";
import { registerSchema } from "./auth.schema.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
