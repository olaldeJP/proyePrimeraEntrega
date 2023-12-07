import express, { Router } from "express";
import {
  realTimeProductsWeb,
  logginUsser,
  usserRegister,
  saveAndSend,
  chatHandlebars,
  homeWeb,
} from "../controllers/web.Constrollers.js";

export const webRouter = new Router();

//Renderiza la pagina de RealTimeHandlebars
webRouter.get("/realTimeProducts", realTimeProductsWeb);

//Renreriza la ventana de chatHandlebars
webRouter.get("/chatHandlebars", chatHandlebars);

//Guarda el usuario y contraseña en la base de datos de mongose
webRouter.post("/usserRegister", usserRegister);

//Guarda los mensajes en la base de datos y los envia con el socket, peticiones enviadas desde chatWindows.js para la actualizacion de mensajes
webRouter.post("/messagePost", saveAndSend);

//Chequea que el usser y el password enviados en el boddy esten en la base de datos de mongo
webRouter.get("/logginUsser", logginUsser);

//Muestra los productos por Handlebars
webRouter.get("/", homeWeb);
