import { Router } from "express";
import { productsRouter } from "./products.Router.js";
import { cartsRouter } from "./carts.Router.js";

export const apiRouter = new Router();

//Se agregan las apis de productos y Carts

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
