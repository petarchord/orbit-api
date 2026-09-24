import { Router } from "express";
import { register, login, me, logout } from "./auth.controller.js";
import { validateBody } from "../../middleware/validate-body.js";
import { authenticate } from "../../middleware/authenticate.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { authorize } from "../../middleware/authorize.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticate, me);

//admin

authRouter.post(
  "/admin/test",
  authenticate,
  authorize(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  },
);
