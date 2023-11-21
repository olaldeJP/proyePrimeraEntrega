import { Router } from "express";
import { agregarProductosArregloCartsByCId , mostrarListaDeProductosByCId ,crearNuevoCarts } from "../controllers/carts.Constrollers.js";

export const cartsRouter=Router()


//Carga de los controllers al router de carts

cartsRouter.post('/',crearNuevoCarts)
cartsRouter.post('/:cid/product/:pid',agregarProductosArregloCartsByCId)
cartsRouter.get('/:cid',mostrarListaDeProductosByCId)