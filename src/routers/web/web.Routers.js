import express, { Router } from "express";
import {
  realTimeProductsWeb,
  logginUsser,
  usserRegister,
  chatHandlebars,
  mostrarProducto,
  mostrarLogin,
  verPerfil,
  mostrarProductosCarrito,
  ventanaRegister,
  homeWeb,
} from "../../controllers/ControllersWeb/web.Constrollers.js";
import { cookieCreate } from "../../middlewares/cookies.Middlewares.js";

export const webRouter = new Router();

//Renderiza la pagina de RealTimeHandlebars
webRouter.get("/realTimeProducts", realTimeProductsWeb);

//Renreriza la ventana de chatHandlebars
webRouter.get("/chatHandlebars", chatHandlebars);

//Muestra ventana de registro.handlebars
webRouter.get("/register", ventanaRegister);

//////Muestra ventana de Login.handlebars
webRouter.get("/login", mostrarLogin);

//////Muestra ventana de Login.handlebars
webRouter.get("/perfil", verPerfil);

//Guarda el usuario y contraseña en la base de datos de mongose
webRouter.post("/usserRegister", usserRegister);

//Chequea que el usser y el password enviados en el boddy esten en la base de datos de mongo
webRouter.get("/logginUsser", logginUsser);

//Muestra los productos con paginate con Handlebars

webRouter.get("/", homeWeb);

//Muestra Productos con Paginate con HandleBars
webRouter.get("/products", homeWeb);

//descripcion del producto
webRouter.get("/:pid", mostrarProducto);

// visualizar solo un carrito especifico
webRouter.get("/carts/:cid", mostrarProductosCarrito);
