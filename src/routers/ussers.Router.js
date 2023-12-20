import { Router } from "express";
import { register, login, logout } from "../controllers/ussers.Constrollers.js";
export const ussersRouter = new Router();

ussersRouter.post("/register", register);
ussersRouter.post("/login", login);
ussersRouter.delete("/", logout);
