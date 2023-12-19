import { Router } from "express";
import {
  registrarUsuario,
  conectUsser,
} from "../controllers/ussers.Constrollers.js";
export const ussersRouter = new Router();

ussersRouter.post("/register", registrarUsuario);
ussersRouter.post("/login", conectUsser);
