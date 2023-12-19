import { Router } from "express";
import { registrarUsuario } from "../controllers/ussers.Constrollers.js";
export const ussersRouter = new Router();

ussersRouter.post("/register", registrarUsuario);
