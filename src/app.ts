import express from "express";
import { authRouter } from "./modules/auth/auth.router.js";
import { errorHandler } from "./errors/global-error.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use(errorHandler);

export default app;
