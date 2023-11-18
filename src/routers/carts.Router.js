import { Router } from "express";
import { agregarProductosArregloCartsByCId , mostrarListaDeProductosByCId ,crearNuevoCarts } from "../controllers/carts.Constrollers.js";

export const cartsRouter=Router()

cartsRouter.post('/api/carts',crearNuevoCarts)
cartsRouter.post('/api/carts/:cid/product/:pid',agregarProductosArregloCartsByCId)
cartsRouter.get('/api/carts/:cid',mostrarListaDeProductosByCId)